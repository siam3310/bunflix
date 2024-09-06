"use client";
import { MicIcon, CaptionsIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { toast } from "sonner";

export default function EpisodeSelector({
  currentEpisode,
  currentEpisodeNum,
  data,
  episode,
  lang,
}: {
  currentEpisode: string;
  currentEpisodeNum:string;
  data: aniwatchInfo;
  episode: aniwatchEpisodeData;
  lang: "english" | "japanesse";
}) {
  const [audioToogle, setAudioToogle] = useState<"english" | "japanesse">(
    lang ? lang : "japanesse"
  );

  return (
    <div className="p-4">
      <div className="flex items-center py-4 space-x-2 ">
        <Label htmlFor="audio">English</Label>
        <Switch
          defaultChecked={lang === "english" ? false : true}
          onCheckedChange={() =>
            setAudioToogle(audioToogle === "english" ? "japanesse" : "english")
          }
          id="audio"
        />
        <Label htmlFor="audio">Japanesse</Label>
      </div>
      <div className="flex items-center mb-6 text-sm">
        <ul
          ref={(el) => {
            el?.scrollBy(0, 64 * Number(currentEpisodeNum?currentEpisodeNum : 1));
          }}
          className="max-h-[70vh] w-full lg:w-[500px] bg-slate-500 overflow-y-scroll rounded-lg"
        >
          {episode.episodes.map((episode, index) => (
            <Link
              target="_blank"
              key={episode.episodeId}
              href={`/anime/${episode.episodeId}&episode=${episode.episodeId}&lang=${audioToogle}&num=${episode.number}`}
              style={{
                pointerEvents:
                  audioToogle === "english"
                    ? data.anime.info.stats.episodes.dub < episode.number
                      ? "none"
                      : "all"
                    : "all",
              }}
            >
              <button
                disabled={
                  audioToogle === "english"
                    ? data.anime.info.stats.episodes.dub < episode.number
                    : false
                }
                style={{
                  backgroundColor:
                    Number(currentEpisodeNum) == Number(episode.number) && audioToogle === lang
                      ? "#b91c1c"
                      : index % 2 === 0
                      ? "#334155"
                      : "#1e293b",
                }}
                className="px-4 h-16 text-start flex w-full items-center justify-between disabled:opacity-35"
              >
                {episode.number}. {episode.title}
                {audioToogle === "english" && (
                  <span className="px-2 bg-purple-700 hidden sm:flex gap-2 items-center w-fit rounded text-nowrap">
                    <MicIcon size={15} />
                    {data.anime.info.stats.episodes.dub < episode.number
                      ? "Dub not available"
                      : `ENG ${episode.number}`}
                  </span>
                )}
                {audioToogle === "japanesse" && (
                  <span className="px-2 bg-yellow-700 hidden sm:flex gap-2 items-center w-fit rounded text-nowrap">
                    <CaptionsIcon size={15} />
                    {data.anime.info.stats.episodes.sub < episode.number
                      ? "Sub not available"
                      : `JP ${episode.number}`}
                  </span>
                )}
              </button>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
