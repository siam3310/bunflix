"use client";
import Localbase from "localbase";
import { Play, SquareArrowOutUpRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Save() {
  const [anime, setAnime] = useState<aniwatchInfo[] | undefined>();

  const db = new Localbase("shows");
  db.config.debug = false;

  useEffect(() => {
    db.collection("anime")
      .get()
      .then((movie: aniwatchInfo[]) => setAnime(movie));
  }, [db]);



  const remove = (id: string) => {
    db.collection("anime").doc(id.toString()).delete();
    toast.error("Movie Removed");
  };

  return (
    <>
      <h1 className=" p-4 font-semibold text-3xl">Anime</h1>
      {anime?.length == 0 && (
        <h1 className=" p-4 font-bold text-xl">Seems like you haven&apos;t Added any Anime to your Collection, yet.</h1>
      )}
      <div className=" px-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {anime?.map((e) => (
          <div
            key={e.anime.info.id}
            className={`relative inline-block text-white rounded-lg overflow-hidden  m-2 transition-all duration-200 `}
          >
            <img
              className={` size-full object-cover object-center`}
              src={e.anime.info.poster}
              alt={e.anime.info.name}
            />
            <div className="absolute h-full flex movie-center justify-between flex-col top-0 left-0 w-full transition-all bg-black/80 backdrop-blur-md opacity-0 hover:opacity-100 p-3  xl:pl-3 group">
              <div>
                <p
                  className={` whitespace-normal font-semibold mb-2 leading-[16px] transition-all duration-[300ms]  group-hover:leading-[28px] text-2xl xl:text-[32px] `}
                >
                  {e.anime.info.name}
                </p>
                <p className="text-[13px] md:text-md opacity-10  duration-500 group-hover:opacity-70 ">
                  {e.anime.moreInfo.synonyms}
                </p>
                <p
                  className=" whitespace-normal line-clamp-4  duration-500 group-hover:opacity-70 
            text-[15px] pt-1 opacity-10"
                >
                  {e.anime.moreInfo.duration}
                </p>
              </div>
              <div className=" flex flex-col gap-2 px-2">
                <Link target='_blank' href={`/anime/${e.anime.info.id}`}>
                  <button className="w-full flex gap-2 items-center hover:bg-white/30 rounded-lg px-2 py-1">
                    <SquareArrowOutUpRight size={20}/> Info
                  </button>
                </Link>
                <button className="w-full flex gap-2 items-center hover:bg-white/30 rounded-lg px-2 py-1" onClick={() => remove(e.anime.info.id)}>
                  <X/> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
     </>
  );
}
