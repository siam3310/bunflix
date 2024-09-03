"use client";
import { CaptionsIcon, MicIcon } from "lucide-react";
import Link from "next/link";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useState } from "react";

export function AniwatchInfo({
  currentEpisode,
  data,
  episode,
  lang,
}: {
  currentEpisode: number;
  data: aniwatchInfo;
  episode: aniwatchEpisodeData;
  lang: "english" | "japanesse";
}) {
  const [audioToogle, setAudioToogle] = useState<"english" | "japanesse">(
    lang ? lang : "english"
  );

  return (
    <div className="p-4">
      <div>
        <img
          className="-z-10 fixed top-0 size-full object-cover blur-2xl "
          src={data.anime.info.poster}
          alt={data.anime.info.name}
        />
        <div className=" lg:flex ">
          <div className="lg:mr-4">
            <h1 className="text-3xl font-semibold ">Episodes</h1>
            <Label className="capitalize">
              You&apos;re currently watching in {lang}
            </Label>
            <div className="flex items-center py-4 space-x-2">
              <Label htmlFor="audio">English</Label>
              <Switch
                defaultChecked={
                  lang ? (lang === "english" ? false : true) : false
                }
                onCheckedChange={() =>
                  setAudioToogle(
                    audioToogle === "english" ? "japanesse" : "english"
                  )
                }
                id="audio"
              />
              <Label htmlFor="audio">Japanesse</Label>
            </div>
            <div className="flex items-center mb-6">
              <ul
                ref={(el) => {
                  el?.scrollBy(0, 64 * --currentEpisode);
                }}
                className="max-h-[400px] w-full lg:w-[500px] bg-slate-500 overflow-y-scroll rounded-lg"
              >
                {episode.episodes.map((episode, index) => (
                  <Link
                    target="_blank"
                    key={episode.episodeId}
                    href={`/anime/${episode.episodeId}&episode=${episode.number}&lang=${audioToogle}`}
                    // className="min-h-[90px]"
                  >
                    <button
                      disabled={
                        audioToogle === "english"
                          ? data.anime.info.stats.episodes.dub < episode.number
                          : false
                      }
                      style={{
                        backgroundColor:
                          currentEpisode == episode.number &&
                          audioToogle === lang
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

          <div className=" lg:mt-0 mt-6 lg:px-4">
            <h1 className=" my-2 text-4xl font-semibold">
              {data.anime.info.name}
            </h1>
            <h2 className=" italic text-xl opacity-70 my-2 flex gap-2">
              {data.anime.moreInfo.japanese}
            </h2>
            <p className=" leading-6 text-[18px]">
              {data.anime.info.description}
            </p>
            <div className=" my-4 flex flex-col gap-2 opacity-70">
              {data.anime.moreInfo.genres && (
                <div className="flex items-center gap-2 flex-wrap">
                  Genres :
                  {data.anime.moreInfo.genres?.map((e) => (
                    <Link
                      target="_blank"
                      href={`/genre/${e.toLowerCase()}`}
                      className="flex gap-2 underline py-1 px-2 text-sm rounded-md items-center bg-black/30"
                      key={e}
                    >
                      <span className=" flex gap-2">{e}</span>
                    </Link>
                  ))}
                </div>
              )}
              {data.anime.moreInfo.studios && (
                <p className=" flex gap-2 flex-wrap">
                  Studio :
                  {data.anime.moreInfo.studios
                    .split(",")
                    .map((studio: string) => (
                      <Link
                        key={studio}
                        target="_blank"
                        className="flex gap-2 underline py-1 px-2 text-sm rounded-md items-center bg-black/30"
                        href={`/anime-studio/${studio.toLowerCase()}`}
                      >
                        {studio}
                      </Link>
                    ))}
                </p>
              )}
              {data.anime.moreInfo.producers && (
                <p className=" flex gap-2 flex-wrap">
                  Producers :
                  {data.anime.moreInfo.producers.map((studio: string) => (
                    <Link
                      key={studio}
                      target="_blank"
                      className="flex gap-2 underline py-1 px-2 text-sm rounded-md items-center bg-black/30"
                      href={`/anime-producers?type=${studio.toLowerCase()}`}
                    >
                      {studio}
                    </Link>
                  ))}
                </p>
              )}
              <p className=" flex gap-2">
                Release Date : {data.anime.moreInfo.aired}
              </p>
              <p className=" flex gap-2">
                Premiered : {data.anime.moreInfo.premiered}
              </p>
              <p className=" flex gap-2">
                Duration : {data.anime.moreInfo.duration}
              </p>
              <p className=" flex gap-2">
                Status : {data.anime.moreInfo.status}
              </p>

              <div className="flex gap-2">
                <p className=" flex gap-2">
                  Sub : {data.anime.info.stats.episodes.sub}
                </p>
                <p className=" flex gap-2">
                  Dub : {data.anime.info.stats.episodes.dub || "Not Available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:flex">
        <div className="flex flex-col w-full">
          <h1 className="text-3xl font-semibold my-4">More Like This</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-6 w-full gap-3  ">
            {data.recommendedAnimes.map((episode, i) => (
              <Link
                key={episode.id + i}
                href={`/anime/${episode.id}`}
                className="min-w-[150px] w-full lg:w-full h-[300px] rounded-md overflow-hidden group  relative text-end"
              >
                <img
                  className="w-full h-full object-cover absolute top-0 group-hover:scale-105 transition-all"
                  src={episode.poster}
                  alt={episode.name}
                />
                <div className=" absolute bottom-0 left-0 p-2 bg-gradient-to-br from-transparent to-black/80 transition-all group-hover:backdrop-blur-md size-full flex items-end flex-col justify-end capitalize">
                  <h1 className="text-lg font-semibold leading-tight">
                    {episode.name}
                  </h1>
                  <h1 className="text-sm leading-tight my-1.5">
                    {episode.jname}
                  </h1>
                  <div className="flex text-sm gap-1">
                    <p>{episode.type}</p>
                    <p className="flex items-center gap-1 bg-purple-500/70 rounded-sm  px-1">
                      <MicIcon size={10} />
                      {episode.episodes?.dub || "NA"}
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
          <h1 className="text-3xl font-semibold my-4">Most Popular</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-6 w-full gap-3  ">
            {data.mostPopularAnimes.map((episode, i) => (
              <Link
                key={episode.id + i}
                href={`/anime/${episode.id}`}
                className="min-w-[150px] w-full lg:w-full h-[300px] rounded-md overflow-hidden group  relative text-end"
              >
                <img
                  className="w-full h-full object-cover absolute top-0 group-hover:scale-105 transition-all"
                  src={episode.poster}
                  alt={episode.name}
                />
                <div className=" absolute bottom-0 left-0 p-2 bg-gradient-to-br from-transparent to-black/80 transition-all group-hover:backdrop-blur-md size-full flex items-end flex-col justify-end capitalize">
                  <h1 className="text-lg font-semibold leading-tight">
                    {episode.name}
                  </h1>
                  <h1 className="text-sm leading-tight my-1.5">
                    {episode.jname}
                  </h1>
                  <div className="flex text-sm gap-1">
                    <p>{episode.type}</p>
                    <p className="flex items-center gap-1 bg-purple-500/70 rounded-sm  px-1">
                      <MicIcon size={10} />
                      {episode.episodes?.dub || "NA"}
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
        </div>
        <div className="lg:w-1/3 p-4">
          <h1 className="text-3xl font-semibold my-4">Seasons</h1>
          <div className="flex flex-col gap-3 bg-black/30 p-2 rounded-sm">
            {data.seasons.map((episode) => (
              <Link
                href={`/anime/${episode.id}`}
                key={episode.id}
                className="flex gap-2"
              >
                <img
                  src={episode.poster}
                  className="h-20 rounded-sm"
                  alt={episode.name}
                />
                <div className="">
                  <h1>{episode.name}</h1>
                  <div className="flex text-sm gap-1">
                    <p>{episode?.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <h1 className="text-3xl font-semibold my-4">Related Animes</h1>

          <div className="flex flex-col gap-3 bg-black/30 p-2 rounded-sm">
            {data.relatedAnimes.map((episode) => (
              <Link
                href={`/anime/${episode.id}`}
                key={episode.id}
                className="flex gap-2"
              >
                <img
                  src={episode.poster}
                  className="h-20 rounded-sm"
                  alt={episode.name}
                />
                <div className="">
                  <h1>{episode.name}</h1>
                  <div className="flex text-sm gap-1">
                    <p>{episode.type}</p>
                    <p className="flex items-center gap-1 bg-purple-500/70 rounded-sm  px-1">
                      <MicIcon size={10} />
                      {episode.episodes?.dub || "NA"}
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
        </div>
      </div>

      {/* <div>
        <h1 className="font-semibold my-4 text-4xl">Seasons</h1>
        <div className=" mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4">
          {data.seasons.map((e) => (
            <Link
              target="_blank"
              href={`/anime/${e.id}`}
              key={e.id}
              className=" p-2 rounded-lg bg-black/50 flex flex-col "
            >
              <img
                className="h-[200px] w-full rounded object-cover "
                src={e.poster}
                alt={e.title}
              />
              <p className=" opacity-65 my-1 text-sm">{e.title}</p>
              <p className=" opacity-65 leading-tight font-bold ">{e.name}</p>
            </Link>
          ))}
        </div>
        {data.seasons.length == 0 && <p>Related Content Found !</p>}
      </div> */}
    </div>
  );
}
