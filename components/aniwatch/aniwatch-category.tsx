"use client";
import { CaptionsIcon, MicIcon, TvIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AniwatchCategory({ anime }: { anime: aniwatchApi }) {
  
  const [date, setDate] = useState(anime.top10Animes.today);
  const router = useRouter();

  
  return (
    <>
      <h1 className="text-3xl py-2 font-semibold px-4">Newly Added</h1>
      <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {anime.latestEpisodeAnimes.map((episode) => (
          <Link
            key={episode.id}
            href={(`/anime/${episode.id}`)}
            className="bg-slate-800 rounded-xl space-y-4 overflow-hidden"
          >
            <div className="aspect-[3/4] w-full overflow-hidden">
              <img
                className=" object-cover hover:scale-105 transition-all w-full rounded-t-md"
                src={episode.poster}
                alt={episode.name}
              />
            </div>
            <div className="flex gap-2 px-2">
              <span
                style={{ opacity: episode.episodes.dub ? "100%" : "30%" }}
                className="px-2 bg-purple-700 flex gap-2 items-center w-fit rounded"
              >
                <MicIcon size={15} />
                {episode.episodes.dub}
              </span>
              <span className="px-2 bg-yellow-700 flex gap-2 items-center w-fit rounded">
                <CaptionsIcon size={15} />
                {episode.episodes.sub}
              </span>
              <span className="px-2 bg-slate-700 flex gap-2 items-center w-fit rounded">
                <TvIcon size={15} />
                {episode.type}
              </span>
            </div>
            <p className="font-semibold text-xl px-2">{episode.name}</p>
          </Link>
        ))}
      </div>

      <div className=" grid sm:grid-cols-2 lg:grid-cols-3">
        <div className="px-4 flex flex-col gap-2">
          <h1 className="text-3xl py-2 font-semibold px-4">Top Airing</h1>
          {anime.topAiringAnimes.slice(0, 5).map((episode) => (
            <Link 
            href={(`/anime/${episode.id}`)}
            key={episode.id} className="flex bg-slate-800 p-2 rounded-lg ">
              <img
                className="aspect-square object-cover size-[70px] rounded-lg"
                src={episode.poster}
                alt={episode.name}
              />
              <div className="px-2">
                <p>{episode.name}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="px-4 flex flex-col gap-2">
          <h1 className="text-3xl py-2 font-semibold px-4">Top upcoming</h1>
          {anime.topUpcomingAnimes.slice(0, 5).map((episode) => (
            <Link key={episode.id}
            href={(`/anime/${episode.id}`)}
            className="flex bg-slate-800 p-2 rounded-lg ">
              <img
                className="aspect-square object-cover size-[70px] rounded-lg"
                src={episode.poster}
                alt={episode.name}
              />
              <div className="px-2">
                <p>{episode.name}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="px-4 flex flex-col gap-2">
          <h1 className="text-3xl py-2 font-semibold ">Popular Anime</h1>
          <div className="flex gap-2 my-1">
            <button
              onClick={() => setDate(anime.top10Animes.today)}
              style={{
                backgroundColor:
                  date === anime.top10Animes.today ? "white" : "",
                color: date === anime.top10Animes.today ? "black" : "",
              }}
              className="px-2 py-1 rounded hover:bg-red-600 transition-all"
            >
              Daily
            </button>
            <button
              style={{
                backgroundColor: date === anime.top10Animes.week ? "white" : "",
                color: date === anime.top10Animes.week ? "black" : "",
              }}
              className="px-2 py-1 rounded hover:bg-red-600 transition-all"
              onClick={() => setDate(anime.top10Animes.week)}
            >
              Weekly
            </button>
            <button
              className="px-2 py-1 rounded hover:bg-red-600 transition-all"
              style={{
                backgroundColor:
                  date === anime.top10Animes.month ? "white" : "",
                color: date === anime.top10Animes.month ? "black" : "",
              }}
              onClick={() => setDate(anime.top10Animes.month)}
            >
              Monthly
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {date.slice(0, 5).map((episode) => (
                <Link key={episode.id}
                href={(`/anime/${episode.id}`)}
                className="flex bg-slate-800 p-2 rounded-lg "
              >
                <img
                  className="aspect-square object-cover size-[70px] rounded-lg"
                  src={episode.poster}
                  alt={episode.name}
                />
                <div className="px-2">
                  <p>{episode.name}</p>
                  <div className="flex gap-2">
                    <span
                      style={{ opacity: episode.episodes.dub ? "100%" : "30%" }}
                      className="px-2 bg-purple-700 flex gap-2 items-center w-fit rounded"
                    >
                      <MicIcon size={15} />
                      {episode.episodes.dub}
                    </span>
                    <span className="px-2 bg-yellow-700 flex gap-2 items-center w-fit rounded">
                      <CaptionsIcon size={15} />
                      {episode.episodes.sub}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
