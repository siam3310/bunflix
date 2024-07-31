"use client";
import { CaptionsIcon, MicIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AniwatchHome({ anime }: { anime: aniwatchApi }) {
  const [date, setDate] = useState(anime.top10Animes.today);

  return (
    <>
      <h1 className="text-3xl py-2 font-semibold px-4">Newly Added</h1>
      <div className="lg:flex">
        <div className="grid gap-3 p-4 grid-cols-2 md:grid-cols-3  xl:grid-cols-5">
          {anime.latestEpisodeAnimes.map((episode) => (
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
                <div className="flex text-sm gap-1">
                  <p>{episode.type}</p>
                  <p className="flex items-center gap-1 bg-purple-500/70 rounded-sm  px-1">
                    <MicIcon size={10} />
                    {episode.episodes.dub || "NA"}
                  </p>
                  <p className="flex items-center gap-1 bg-yellow-500/80 rounded-sm  px-1">
                    <CaptionsIcon size={10} />
                    {episode.episodes.sub}
                  </p>
                </div>
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

          <div className="flex flex-col gap-2 min-w-[400px] max-w-[400px]">
            {date.map((episode) => (
              <Link
                key={episode.id}
                href={`/anime/${episode.id}`}
                className="flex bg-black/30 p-2 rounded-lg "
              >
                <img
                  className="aspect-square object-cover size-[70px] rounded-md"
                  src={episode.poster}
                  alt={episode.name}
                />
                <div className="px-2">
                  <p className="text-sm">{episode.name}</p>
                  <div className="flex gap-1 text-sm">
                    <span
                      className="px-1 bg-purple-500/70 flex gap-2 items-center w-fit rounded"
                    >
                      <MicIcon size={10} />
                      {episode.episodes.dub || 'NA'}
                    </span>
                    <span className="px-2 bg-yellow-500/70 flex gap-2 items-center w-fit rounded">
                      <CaptionsIcon size={10} />
                      {episode.episodes.sub}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h1 className="text-3xl py-2 font-semibold px-4">Top Airing</h1>
        <div className="px-4 flex  gap-3 overflow-x-scroll scrollbar-hide">
          {anime.topAiringAnimes.map((episode) => (
            <div
              className="min-w-[200px] h-[300px] rounded-md overflow-hidden group relative"
              key={episode.id}
            >
              <Link href={`/anime/${episode.id}`}>
                <img
                  className="size-full object-cover group-hover:scale-105 transition-all"
                  src={episode.poster}
                  alt={episode.name}
                />

                <div className=" absolute bottom-0 left-0 p-2 bg-gradient-to-br from-transparent to-black/80 transition-all group-hover:backdrop-blur-md size-full flex items-end flex-col justify-end capitalize">
                  <h1 className="text-xl font-semibold">{episode.name}</h1>
                  <p>{episode.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-3xl py-2 font-semibold px-4">Upcoming Anime</h1>
        <div className="px-4 flex  gap-3 overflow-x-scroll scrollbar-hide">
          {anime.topUpcomingAnimes.map((episode) => (
            <div
              className="min-w-[200px] h-[300px] rounded-md overflow-hidden group  relative"
              key={episode.id}
            >
              <Link href={`/anime/${episode.id}`}>
                <img
                  className="size-full object-cover group-hover:scale-105 transition-all"
                  src={episode.poster}
                  alt={episode.name}
                />

                <div className=" absolute bottom-0 left-0 p-2 bg-gradient-to-br from-transparent to-black/80 transition-all group-hover:backdrop-blur-md size-full flex items-end flex-col justify-end capitalize">
                  <h1 className="text-xl font-semibold">{episode.name}</h1>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
