"use client";
import { createImageUrl } from "@/lib/create-image-url";
import Localbase from "localbase";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type episodeList ={
    title: string;
    episodeId: string;
    number: number;
    isFiller: boolean;
}


export default function Save() {
  const [animeEpisode, setAnimeEpisode] = useState<
    episodeList[] | undefined
  >();

  const db = new Localbase("shows");
  db.config.debug = false;

  useEffect(() => {
    db.collection("anime-episode")
      .get()
      .then((movie: episodeList[]) => setAnimeEpisode(movie));
  }, [db]);



  const remove = (id: string) => {
    db.collection("anime-episode").doc(id).delete();
  };

  return (
    <>
      <h1 className=" p-4 font-semibold text-3xl">Anime Episode</h1>
      {animeEpisode?.length == 0 && (
        <h1 className=" p-4 font-bold text-xl">Seems like you haven&apos;t Added any Anime to your Collection, yet.</h1>
      )}
      <div className=" xl:w-2/3 px-4  grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {animeEpisode?.map((e) => (
          <div
            className=" h-[300px] flex flex-col justify-between p-4 rounded-lg bg-black/30"
            key={e.episodeId}
          >
            <div>
              <h1 className=" text-lg font-semibold">{e.title}</h1>
              <p className=" opacity-60">Episode no. {e.number}</p>
            </div>
            <div>
              <h1 className="opacity-60 mb-2">Languages :</h1>
              <div className=" flex flex-col gap-2">
                <div className="w-full flex gap-2">
                  <Link
                    href={`/animeWatch/en/${e.episodeId}&episode=${e.number}`}
                    className="w-full"
                  >
                    <button className="w-full py-1 transition-all hover:font-semibold rounded-lg text-lg hover:bg-red-600 text-start pl-2">
                      English
                    </button>
                  </Link>
                  <Link
                    href={`/animeWatch/en/${e.episodeId}&episode=${e.number}`}
                    className=" p-3 transition-all hover:bg-red-600 rounded-lg "
                    target="_blank"
                  >
                    <SquareArrowOutUpRight size={15} />
                  </Link>
                </div>
                <div className="w-full flex gap-2">
                  <Link
                    href={`/animeWatch/jp/${e.episodeId}&episode=${e.number}`}
                    className="w-full"
                  >
                    <button className=" w-full py-1 transition-all hover:font-semibold rounded-lg text-lg hover:bg-red-600 text-start pl-2">
                      Japanesse
                    </button>
                  </Link>
                  <Link
                    href={`/animeWatch/jp/${e.episodeId}&episode=${e.number}`}
                    className=" p-3 transition-all hover:bg-red-600 rounded-lg "
                    target="_blank"
                  >
                    <SquareArrowOutUpRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
                <button onClick={() => remove(e.episodeId)}>
                  remove
                </button>
          </div>
        ))}
      </div>
     </>
  );
}
