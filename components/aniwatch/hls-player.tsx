"use client";
import Hls, { Level } from "hls.js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FastForwardIcon,
  FullscreenIcon,
  GaugeIcon,
  LoaderIcon,
  PauseIcon,
  PlayIcon,
  RotateCcwIcon,
  RotateCwIcon,
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
  episode: aniwatchEpisodeData
  track: { file: string; kind: string; label: string; default: boolean }[];
  lang: string;
  currentEpisode: number;
  ep: string;
  episodeId: string;
}) {

  const player = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState<[number, number]>([0, 0]);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [duration, setDuration] = useState<[number, number]>([0, 0]);
  const [durationSec, setDurationSec] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControl, setShowControl] = useState(false);
  const [volume, setVolume] = useState<number>(1);
  const [levels, setLevels] = useState<Level[]>([]);
  const [hlsInstance, setHlsInstance] = useState<null | Hls>(null);
  const [fastSpeed, setFastSpeed] = useState(false);
  const { isSearchBarFocused } = useSearchBarFocus();
  const searchParams = useSearchParams();

  const time = searchParams.get("time");

  // hls initialization and attaching soucres
  useEffect(() => {
    if (Hls.isSupported() && player.current) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(player.current);

      hls.on(Hls.Events.MANIFEST_LOADING, () => {
        setLoading(true);
      });

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        setLevels(data.levels);
        player.current?.play();
      });
      hls.startLoad();
      setHlsInstance(hls);
      updateCurrentTime();

      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              toast.warning("fatal network error encountered, try to recover");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              toast.warning("fatal media error encountered, try to recover");
              hls.recoverMediaError();
              break;
            case Hls.ErrorTypes.OTHER_ERROR:
              toast.error("fatal error encountered");
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });

      if (time) {
        player.current.currentTime = parseInt(time);
      }

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
      setIsPlaying(!isPlaying);
    }
  };

  const toogleMute = () => {
    if (player.current) {
      if (isMuted) {
        player.current.muted = false;
        setIsMuted(false);
      } else {
        player.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
      if (screen.orientation) {
        screen.orientation.unlock();
        setIsFullscreen(false);
      }
    } else {
      containerRef?.current?.requestFullscreen();
      if (
        (screen.orientation as any) &&
        typeof (screen.orientation as any).lock === "function"
      ) {
        (screen.orientation as any).lock("landscape");
        setIsFullscreen(true);
      }
    }
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
      setVolume(player.current.volume);
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
    setFastSpeed(!fastSpeed);
    if (player.current && player.current.playbackRate <= 2) {
      player.current.playbackRate += 2;
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
          episode:currentEpisode,
          id: `${episodeId}?ep=${ep}`,
          time: player.current?.currentTime || 0,
        });
      }
    }, 20_000);

    return () => clearInterval(interval);
  }, [existingShow]);

  return (
    <div className=" md:p-4 focus:outline-none">
      <div
        onMouseEnter={() => setShowControl(true)}
        onMouseLeave={() => setShowControl(false)}
        ref={containerRef}
        style={{
          cursor: showControl ? "auto" : "none",
        }}
        className=" group md:h-[450px] lg:h-[550px] xl:h-[600px] w-full relative overflow-hidden md:rounded-lg"
      >
        <div
          style={{ opacity: loading ? "100%" : "0%" }}
          className="pointer-events-none cursor-default absolute -translate-y-1/2 -translate-x-1/2 text-xl left-1/2 top-1/2 rounded-lg p-3 flex items-center gap-2 z-50 "
        >
          <LoaderIcon
            color="white"
            size={18}
            style={{
              animation: "spin 2s linear infinite",
            }}
            className=" transition-all"
          />
          <span>Loading ...</span>
        </div>

        <video
          className="w-full h-full  bg-black/60 relative "
          crossOrigin="anonymous"
          controlsList="nodownload"
          ref={player}
        />
        <div
         
          onClick={()=>setShowControl(!showControl)}
          className="absolute top-0  left-0 p-4  size-full"
        >
        <h1
         style={{
          opacity: loading ? "0%" : showControl ? "100%" : "0%",
          pointerEvents: loading ? "none" : showControl ? "all" : "none",
        }}
        className="text-lg">{currentEpisode} {episode.episodes[--currentEpisode].title} - {data.anime.info.name}</h1>
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
                <FastForwardIcon className="rotate-180" color="white" size={20} />
              </button>
              <button
                className="rounded-full aspect-square p-2 transition-all hover:scale-110"
                onClick={()=>shortcutPopups("forward")}
              >
                {isPlaying ? (
                  <PauseIcon size={iconSize} />
                ) : (
                  <PlayIcon size={iconSize} />
                )}
              </button>
              <button
                className="rounded-full aspect-square p-2 transition-all hover:scale-110"
                onClick={()=>shortcutPopups("forward")}
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
              <p className=" text-nowrap text-sm mt-1">
                {currentTime[0]}:{currentTime[1]} /{" "}
                {duration[0] ? duration[0] : 0}:{duration[1] ? duration[1] : 0}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="py-2 px-3 text-start flex gap-2">
                {levels.map((level, index) => (
                  <p
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
                  </p>
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
    </div>
  );
}
