"use client";
import Hls from "hls.js";
import React, { Suspense, useEffect, useRef } from "react";
import AnimeWatchPlayerInfo from "./aniwatch-player-info";
import AnimeWatchPlayerInfoSkeleton from "../fallback-ui/aniwatch-player-info-skeleton";

export function HlsPlayer({
  videoSrc,
  track,
  id,
  episode,
}: {
  videoSrc: string;
  track: { file: string; kind: string; label: string; default: boolean }[];
  id: string;
  episode: string | number;
}) {
  const player = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (Hls.isSupported() && player.current) {
      var hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(player.current);
    }
  }, [player, videoSrc]);

  return (
    <div className="p-4 bg-black/70 pb-24">
      <div className=" md:h-[450px] mb-4 lg:h-[600px]">
        <video
          className="h-full w-full rounded-lg"
          crossOrigin="anonymous"
          controls
          ref={player}
        >
          {track.map((e) => (
            <track
              key={e.file}
              kind={e.kind}
              src={e.file}
              default={e.default}
              label={e.label}
            ></track>
          ))}
        </video>
      </div>
      <Suspense fallback={<AnimeWatchPlayerInfoSkeleton />}>
        <AnimeWatchPlayerInfo id={id} episode={episode} />
      </Suspense>
    </div>
  );
}
