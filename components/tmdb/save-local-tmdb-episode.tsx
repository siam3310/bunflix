"use client";
import Localbase from "localbase";
import { Star } from "lucide-react";
import {  useState } from "react";
import {  toast } from "sonner";

export function SaveLocalTmdbEpisode({
  item,
  text,
  rounded,
  episode,
  season,
  px
}: {
  item: tmdbEpisodeResult;
  text?: boolean;
  rounded?: boolean;
  season:number
  episode:number|string
  px?:boolean
}) {
  const [isSaved, setIsSaved] = useState(false);
  

  let db = new Localbase("shows");
  db.config.debug = false;

  const saveLocal = () => {
    db.collection("tv-episode").add(
      { ...item, type: 'tv-episode' ,season:season,episode:episode},
      item.id,
    );
    toast.success("Saved Successfully", {
      description: "Click the Star Icon to see all starred Items",
      action: {
        label: "Undo",
        onClick: () => {
          db.collection("movies").doc({ id: item.id.toString() }).delete();
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
        className={` font-semibold ${px ? `px-2 py-2`:`py-3 px-3`} ${rounded ? 'rounded-full':"rounded-md"} flex  border border-white disabled:border-black  disabled:text-white/60 disabled:bg-black/80 xl:justify-center gap-2 items-center w-fit
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
