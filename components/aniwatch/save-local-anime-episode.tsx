"use client";
import Localbase from "localbase";
import { Star } from "lucide-react";
import { useState } from "react";
import {  toast } from "sonner";

export function SaveLocalAnimeEpisode({
  item,
  text,
  episode,
  season,
  rounded,
  px
}: {
  item: {
    title: string;
    episodeId: string;
    number: number;
    isFiller: boolean;
}
  text?: boolean;
  rounded?: boolean;
  episode?: number | string;
  season?: number;
  px:string
}) {
  const [isSaved, setIsSaved] = useState(false);

  let db = new Localbase("shows");
  db.config.debug = false;

  const saveLocal = () => {
    db.collection("anime-episode").add(
      { ...item, type: 'anime', episode: episode, season: season },
      item.episodeId
    );
    toast.success("Saved Successfully", {
      description: "Click the Star Icon to see all starred Items",
      action: {
        label: "Undo",
        onClick: () => {
          db.collection("anime-episode").doc({ id: item.episodeId }).delete();

          setIsSaved(false);
        },
      },
    });
  };

  return (
    <>
      <button
        disabled={isSaved}
        onClick={() => {
          saveLocal();
          setIsSaved(true);
        }}
        className={` font-semibold ${px} ${rounded ? 'rounded-full':"rounded-md"} flex  border border-white disabled:border-black  disabled:text-white/60 disabled:bg-black/80 xl:justify-center gap-2 items-center w-fit
        `}
      >
        <span>
          <Star fill={isSaved ? "white" : ""} size={15} />
        </span>
        {text && <p>{isSaved ? "Saved" : "Save"}</p>}
      </button>
    </>
  );
}
