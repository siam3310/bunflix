"use client";
import { createImageUrl } from "@/lib/create-image-url";
import Localbase from "localbase";
import { Play, SquareArrowOutUpRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Save() {
  const [tvEpisode, setTvEpisode] = useState<tmdbEpisodeResult[] | undefined>();

  const db = new Localbase("shows");
  db.config.debug = false;

  useEffect(() => {
    db.collection("tv-episode")
      .get()
      .then((movie: tmdbEpisodeResult[]) => setTvEpisode(movie));
  }, [db]);

  const remove = (id: number) => {
    db.collection("tv-episode").doc({ id: id }).delete();
  };

  return (
    <>
      <h1 className=" p-4 font-semibold text-3xl">TV Episodes</h1>
      {tvEpisode?.length == 0 && (
        <h1 className=" p-4 font-bold text-xl">
          Seems like you haven&apos;t Added any TV Shows to your Collection,
          yet.
        </h1>
      )}
      <div className=" px-2 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tvEpisode?.map((e) => (
          <div
            key={e.id}
            className={`relative inline-block text-white rounded-lg overflow-hidden xl:h-[300px] m-2 transition-all duration-200 h-[300px] w-[200px]`}
          >
            <img
              className={` size-full object-cover object-center`}
              src={createImageUrl(e.still_path, "w500")}
              alt={e.name}
            />
            <div className="absolute h-full flex movie-center justify-between flex-col top-0 left-0 w-full transition-all bg-black/80 backdrop-blur-md opacity-0 hover:opacity-100 p-3  xl:pl-3 group">
              <div>
                <p
                  className={`whitespace-normal font-semibold mb-2 leading-[16px] transition-all duration-[300ms]  group-hover:leading-[26px] text-xl xl:text-[24px] `}
                >
                  {e.name}
                </p>
                <p className="text-[13px] md:text-md opacity-10  duration-500 group-hover:opacity-70 ">
                  Episode no. : {e.episode_number}
                </p>
                <p className="text-[13px] md:text-md opacity-10  duration-500 group-hover:opacity-70 ">
                  Season no. : {e.season_number}
                </p>
                <p
                  className=" whitespace-normal line-clamp-4  duration-500 group-hover:opacity-70  leading-4
            text-[15px] pt-1 opacity-10"
                >
                  {e.overview}
                </p>
              </div>
              <div className=" flex flex-col gap-2 px-2">
                <Link
                  href={`/video/tv/${e.show_id}?season=${
                    e.season_number || e.season
                  }&episode=${
                    e.episode_number || e.episode_number
                  }&provider=vidsrc`}
                >
                  <button className="w-full flex gap-2 items-center hover:bg-white/30 rounded-lg px-2 py-1">
                    <Play /> Play
                  </button>
                </Link>
                <button
                  className="w-full flex gap-2 items-center hover:bg-white/30 rounded-lg px-2 py-1"
                  onClick={() => remove(e.id)}
                >
                  <X /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
