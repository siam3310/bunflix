"use client";

import { pendingShows } from "@/lib/pending-show";
import { useLiveQuery } from "dexie-react-hooks";
import { XIcon } from "lucide-react";
import Link from "next/link";

export default function AniwatchContinueWatching() {
  const data = useLiveQuery(() => pendingShows.shows.toArray());

  if (!data) return;

  return (
    <div className="p-4 ">
      <h1 className="text-3xl font-semibold">Continue Watching</h1>
      <div className="flex overflow-x-scroll scrollbar-hide gap-2 items-center text-end mt-4">
        {data.map((show) => (
          <div
            className="min-w-[200px] h-[300px] rounded-md overflow-hidden group relative"
            key={show.id}
          >
            <Link
              href={`/anime/${show.id}&episode=${show.episode}&lang=${show.lang}&time=${show.time}`}
            >
              <img
                className="size-full object-cover group-hover:scale-105 transition-all"
                src={show.image}
                alt={show.name}
              />

              <div className=" absolute bottom-0 left-0 p-2 bg-gradient-to-br from-transparent to-black/80 transition-all group-hover:backdrop-blur-md size-full flex items-end flex-col justify-end capitalize">
                <h1 className="text-xl font-semibold">{show.name}</h1>
                <p>{show.lang}</p>
                <p>Episode {show.episode}</p>
                <p>{Math.floor(show.time / 60)} Minutes Watched</p>
              </div>
            </Link>
            <button
              onClick={() => pendingShows.shows.delete(`${show.id}`)}
              className="absolute top-2 right-2 z-50 hidden group-hover:block p-2 bg-red-500/80 rounded-full"
            >
              <XIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
