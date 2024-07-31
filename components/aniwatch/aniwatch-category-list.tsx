"use client";

import { MicIcon, CaptionsIcon } from "lucide-react";
import Link from "next/link";

export default function AniwatchCategoryList({ anime }: { anime: Anime[] }) {
  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      {anime?.map((episode) => (
        <Link
          key={episode.id}
          href={`/anime/${episode.id}`}
          className="w-full h-[350px] rounded-md overflow-hidden group  relative text-end"
        >
          <img
            className="size-full object-cover group-hover:scale-105 transition-all"
            src={episode.poster}
            alt={episode.name}
          />

          <div className=" absolute bottom-0 left-0 p-2 bg-gradient-to-br from-transparent to-black/80 transition-all group-hover:backdrop-blur-md size-full flex items-end flex-col justify-end capitalize">
            <h1 className="text-xl font-semibold">{episode.name}</h1>
            <div className="flex text-sm gap-2">
              <p>{episode.type}</p>
              <p className="flex items-center gap-1 bg-purple-500/70 rounded-sm py-0.5 px-1">
                <MicIcon size={12} />
                {episode.episodes.dub || "NA"}
              </p>
              <p className="flex items-center gap-1 bg-yellow-500/80 rounded-sm py-0.5 px-1">
                <CaptionsIcon size={12} />
                {episode.episodes.sub}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
