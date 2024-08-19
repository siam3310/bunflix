"use client";
import Hls, { Level } from "hls.js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CaptionsIcon,
  FastForwardIcon,
  FullscreenIcon,
  GaugeIcon,
  PauseIcon,
  PlayIcon,
  Volume1Icon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useSearchBarFocus } from "@/context/searchContext";
import { useLiveQuery } from "dexie-react-hooks";
import { pendingShows } from "@/lib/pending-show";
import { useSearchParams } from "next/navigation";

export function HlsPlayer({
  videoSrc,
  data,
  track,
  lang,
  currentEpisode,
  ep,
  episode,
  episodeId,
}: {
  videoSrc: string;
  data: aniwatchInfo;
  episode: aniwatchEpisodeData;
  track: { file: string; kind: string; label: string; default: boolean }[];
  lang: string;
  currentEpisode: number;
  ep: string;
  episodeId: string;
}) {

  const player = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  interface PlayerOptions {
    isPlaying: boolean;
    loading: boolean;
    isFullscreen: boolean;
    isCaptionsOn: boolean;
    isMuted: boolean;
    showControl: boolean;
    volume: number;
    resolutions: Level[];
    fastSpeed: boolean;
  }

  const [playerOptions, setPlayerOptions] = useState<PlayerOptions>({
    fastSpeed: false,
    isPlaying: true,
    loading: false,
    isFullscreen: false,
    isCaptionsOn: false,
    isMuted: false,
    showControl: false,
    volume: 1,
    resolutions: [],
  });

  const [currentTime, setCurrentTime] = useState<[number, number]>([0, 0]);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [duration, setDuration] = useState<[number, number]>([0, 0]);
  const [durationSec, setDurationSec] = useState<number>(0);

  const [hlsInstance, setHlsInstance] = useState<null | Hls>(null);

  const { isSearchBarFocused } = useSearchBarFocus();
  const searchParams = useSearchParams();

  const time = searchParams.get("time");

  const {
    fastSpeed,
    isFullscreen,
    isMuted,
    isPlaying,
    resolutions,
    loading,
    showControl,
    volume,
    isCaptionsOn,
  } = playerOptions;

  // hls initialization and attaching soucres
  useEffect(() => {
    if (Hls.isSupported() && player.current) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(player.current);

      hls.on(Hls.Events.MANIFEST_LOADING, () => {
        setPlayerOptions({ ...playerOptions, loading: true });
      });

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        setPlayerOptions({ ...playerOptions, resolutions: data.levels });
        player.current?.play();
      });
      hls.startLoad();
      setHlsInstance(hls);
      updateCurrentTime();

      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              toast.warning("network error");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              toast.warning("media error");
              hls.recoverMediaError();
              break;
            case Hls.ErrorTypes.OTHER_ERROR:
              toast.error("fatal error encountered");
              break;
          }
        }
      });

      if (time) {
        player.current.currentTime = parseInt(time);
      }

      hls.destroy()
      return () => {
        hls.destroy();
      };
    }
  }, [player, videoSrc, loading]);

  const tooglePlayPause = () => {
    if (player.current) {
      if (isPlaying) {
        player.current.pause();
      } else {
        player.current.play();
      }
      setPlayerOptions({
        ...playerOptions,
        isPlaying: !playerOptions.isPlaying,
      });
    }
  };

  const toogleMute = () => {
    if (player.current) {
      if (isMuted) {
        player.current.muted = false;
        setPlayerOptions({ ...playerOptions, isMuted: false });
      } else {
        player.current.muted = true;
        setPlayerOptions({ ...playerOptions, isMuted: true });
      }
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
      if (screen.orientation) {
        screen.orientation.unlock();
        setPlayerOptions({ ...playerOptions, isFullscreen: false });
      }
    } else {
      containerRef?.current?.requestFullscreen();
      if (
        (screen.orientation as any) &&
        typeof (screen.orientation as any).lock === "function"
      ) {
        (screen.orientation as any).lock("landscape");
        setPlayerOptions({ ...playerOptions, isFullscreen: true });
      }
    }
  };

  const toogleCaptions = () => {
    setPlayerOptions({
      ...playerOptions,
      isCaptionsOn: !playerOptions.isCaptionsOn,
    });
  };

  const sec2Min = (sec: number) => {
    const min = Math.floor(sec / 60);
    const secRemain = Math.floor(sec % 60);
    return {
      min: min,
      sec: secRemain,
    };
  };

  const updateCurrentTime = () => {
    if (player.current) {
      const { min, sec } = sec2Min(player.current.duration);
      setDurationSec(player.current.duration);
      setDuration([min, sec]);

      const interval = setInterval(() => {
        if (!player.current) return;

        const { min, sec } = sec2Min(player.current.currentTime);
        setCurrentTimeSec(player.current.currentTime);
        setCurrentTime([min, sec]);
      }, 1000);

      return () => clearInterval(interval);
    }
  };

  const volumnControl = (control: "increase" | "decrease") => {
    if (player.current) {
      setPlayerOptions({ ...playerOptions, volume: player.current.volume });
      if (control === "increase") {
        if (player.current.volume === 1) {
          toast.warning("Maximum volumn reached");
          return;
        } else player.current.volume += 0.1;
      } else if (control === "decrease") {
        if (player.current.volume > 0.1) {
          player.current.volume -= 0.1;
        } else {
          toast.warning("Minimum volumn reached");
          return;
        }
      }
    }
  };

  const fastSpeedPlayback = () => {
    setPlayerOptions({ ...playerOptions, fastSpeed: !playerOptions.fastSpeed });
    if (player.current && player.current.playbackRate <= 2) {
      player.current.playbackRate += 1.5;
    } else if (player.current) {
      player.current.playbackRate = 1;
    }
  };

  const shortcutPopups = (
    control:
      | "forward"
      | "backward"
      | "increase"
      | "decrease"
      | "playPause"
      | "mute"
  ) => {
    if (player.current) {
      switch (control) {
        case "forward":
          player.current.currentTime = player.current.currentTime + 5;
          break;
        case "backward":
          player.current.currentTime = player.current.currentTime - 5;
          break;
        case "increase":
          volumnControl("increase");
          break;
        case "decrease":
          volumnControl("decrease");
          break;
        case "playPause":
          tooglePlayPause();
          break;
        case "mute":
          toogleMute();
          break;
      }
    }
  };

  // keyboard shortcut for play,pause,etc
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isSearchBarFocused) {
        return;
      }
      // console.log(event.code);
      switch (event.code) {
        case "Space":
          event.preventDefault();
          tooglePlayPause();
          shortcutPopups("playPause");
          break;
        case "KeyF":
          event.preventDefault();
          toggleFullscreen();
          break;
        case "KeyL":
          event.preventDefault();
          fastSpeedPlayback();
          break;
        case "KeyC":
          event.preventDefault();
          toogleCaptions();
          break;
        case "KeyM":
          toogleMute();
          shortcutPopups("mute");
          break;
        case "ArrowUp":
          event.preventDefault();
          shortcutPopups("increase");
          break;
        case "ArrowDown":
          event.preventDefault();
          shortcutPopups("decrease");
          break;
        case "ArrowLeft":
          event.preventDefault();
          shortcutPopups("backward");
          break;
        case "ArrowRight":
          event.preventDefault();
          shortcutPopups("forward");
          break;
        case "Escape":
          event.preventDefault();
          toggleFullscreen();
      }
    };
    updateCurrentTime();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isPlaying,
    isFullscreen,
    isCaptionsOn,
    isMuted,
    currentTimeSec,
    isSearchBarFocused,
  ]);

  const iconSize: number = 20;

  const existingShow = useLiveQuery(() =>
    pendingShows.shows?.where("id").equals(`${episodeId}?ep=${ep}`).count()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (existingShow) {
        pendingShows.shows.update(`${episodeId}?ep=${ep}`, {
          time: player.current?.currentTime || 0,
        });
      } else {
        pendingShows.shows.add({
          lang,
          name: data.anime.info.name,
          image: data.anime.info.poster,
          episode: currentEpisode,
          id: `${episodeId}?ep=${ep}`,
          time: player.current?.currentTime || 0,
        });
      }
    }, 20_000);

    return () => clearInterval(interval);
  }, [existingShow]);

  useEffect(() => {
    containerRef.current?.addEventListener("mousemove", () => {
      setPlayerOptions({ ...playerOptions, showControl: true });
    });
    const interval = setInterval(() => {
      setPlayerOptions({ ...playerOptions, showControl: false });
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className=" md:p-4 focus:outline-none">
      <div
        // onMouseEnter={() =>
        //   setPlayerOptions({ ...playerOptions, showControl: true })
        // }
        // onMouseLeave={() =>
        //   setPlayerOptions({ ...playerOptions, showControl: false })
        // }
        ref={containerRef}
        style={{
          cursor: showControl ? "auto" : "none",
        }}
        className=" group md:h-[450px] lg:h-[550px] xl:h-[600px] w-full relative overflow-hidden md:rounded-lg"
      >
        <video
          className="w-full h-full  bg-black/60 relative "
          crossOrigin="anonymous"
          controlsList="nodownload"
          ref={player}
        >
          {playerOptions.isCaptionsOn &&
            track
              ?.filter((engSub) => engSub.default === true)
              ?.map((track) => (
                <track
                  key={track.file}
                  label={track.label}
                  kind={track.kind}
                  src={track.file}
                  default={track.default}
                />
              ))}
        </video>
        <div
          onClick={() =>
            setPlayerOptions({
              ...playerOptions,
              showControl: !playerOptions.showControl,
            })
          }
          className="absolute top-0  left-0 p-4  size-full"
        >
          <h1
            style={{
              opacity: loading ? "0%" : showControl ? "100%" : "0%",
              pointerEvents: loading ? "none" : showControl ? "all" : "none",
            }}
            className="text-lg"
          >
            {currentEpisode} {episode.episodes[--currentEpisode]?.title} -{" "}
            {data.anime.info.name}
          </h1>
        </div>
        <div
          style={{
            transform: showControl ? "translateY(0px)" : "translateY(96px)",
          }}
          className="transition-all  gap-2 px-4 absolute bottom-0 w-full py-2 bg-gradient-to-b from-transparent to-black "
        >
          <input
            type="range"
            max={durationSec || 0}
            value={currentTimeSec || 0}
            className="cursor-pointer  h-1 hover:h-2 transition-all focus:outline-none  w-full accent-red-500 "
            onChange={(e) => {
              e.preventDefault();
              if (player.current && player.current.currentTime) {
                player.current.currentTime = parseInt(e.target.value);
              }
            }}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                className="rounded-full aspect-square p-2 transition-all hover:scale-110"
                onClick={() => shortcutPopups("backward")}
              >
                <FastForwardIcon
                  className="rotate-180"
                  color="white"
                  size={20}
                />
              </button>
              <button
                className="rounded-full aspect-square p-2 transition-all hover:scale-110"
                onClick={() => tooglePlayPause()}
              >
                {isPlaying ? (
                  <PauseIcon size={iconSize} />
                ) : (
                  <PlayIcon size={iconSize} />
                )}
              </button>
              <button
                className="rounded-full aspect-square p-2 transition-all hover:scale-110"
                onClick={() => shortcutPopups("forward")}
              >
                <FastForwardIcon size={iconSize} />
              </button>

              <button
                style={{
                  backgroundColor: isMuted || volume <= 0.1 ? " #ef4444" : "",
                }}
                className="rounded-full aspect-square p-2 transition-all hover:scale-110"
                onClick={toogleMute}
              >
                {isMuted || volume <= 0.1 ? (
                  <VolumeXIcon size={iconSize} />
                ) : volume > 0.5 ? (
                  <Volume2Icon size={iconSize} />
                ) : (
                  <Volume1Icon size={iconSize} />
                )}
              </button>
              <button
                style={{
                  backgroundColor: fastSpeed ? " #ef4444" : "",
                }}
                className="rounded-full aspect-square p-2 transition-all hover:scale-110"
                onClick={fastSpeedPlayback}
              >
                <GaugeIcon size={iconSize} />
              </button>
              {/* {track */}
              {/* ?.filter((engSub) => engSub.default === true) */}
              {/* ?.map((track, index) => ( */}
              <button
                style={{
                  backgroundColor: playerOptions.isCaptionsOn ? " #ef4444" : "",
                }}
                className="rounded-full aspect-square p-2 transition-all hover:scale-110"
                onClick={toogleCaptions}
              >
                <CaptionsIcon size={iconSize} />
              </button>
              {/* ))} */}
              <p className=" text-nowrap text-sm mt-1">
                {currentTime[0]}:{currentTime[1]} /{" "}
                {duration[0] ? duration[0] : 0}:{duration[1] ? duration[1] : 0}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="py-2 px-3 text-start flex gap-2">
                {resolutions.map((level, index) => (
                  <button
                    key={index}
                    style={{
                      backgroundColor:
                        index === hlsInstance?.currentLevel ? "#ef4444" : "",
                    }}
                    className=" cursor-pointer rounded-md py-0.5  px-2"
                    onClick={() =>
                      hlsInstance ? (hlsInstance.currentLevel = index) : null
                    }
                  >
                    {level.height}p
                  </button>
                ))}
              </div>
              <button
                className="rounded-full aspect-square p-2 "
                onClick={toggleFullscreen}
              >
                <FullscreenIcon
                  size={iconSize}
                  className="hover:scale-125 transition-all"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading && (<p>loading</p>)}
    </div>
  );
}
