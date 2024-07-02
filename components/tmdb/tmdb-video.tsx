"use client";

import { createImageUrl } from "@/utils/create-image-url";
import { Home, Info, Play, Star } from "lucide-react";
import Link from "next/link";

export function TmdbVideo({
  type,
  id,
  data,
  seasonData,
  url,
  provider,
  epNo,
}: {
  type: string;
  id: string;
  data: MovieResults;
  url: string;
  provider: string;
  seasonData?: tmdbEpisodesInfo | undefined;
  epNo?: number | string;
}) {
  return (
    <div className="p-4 pb-24 bg-black/60">
      <img
        className="-z-10 fixed top-0 size-full object-cover blur-2xl "
        src={createImageUrl(data.backdrop_path, "original")}
        alt={data.name}
      />
      <div className="h-[300px] sm:h-[400px] md:h-[500px] xl:h-[600px]">
        <iframe
          allowFullScreen={true}
          className="w-full rounded-lg h-full bg-black overflow-hidden"
          src={url}
        ></iframe>
      </div>

      <div>
        <div className=" mt-4">
          <div className="p-4 bg-black/20 rounded-xl flex-col  xl:flex-row flex">
            <div className={` ${seasonData ? "xl:w-[400px]" : "w-full"} `}>
              <h1 className="text-5xl font-semibold lg:mb-4">
                {data.title ? data.title : data.name}
              </h1>
              <p className="text-lg ">Overview : </p>
              <p className="text-md leading-tight opacity-70">
                {data.overview || data.synopsis}
              </p>
              <p className="text-lg my-2">Server : </p>
              <div className=" flex gap-2 flex-wrap ">
                <Link
                  href={`/video/${type}/${id}/${
                    type === "tv"
                      ? `?season=${seasonData?.season_number}&episode=${epNo}&provider=vidsrc`
                      : `?provider=vidsrc`
                  }`}
                >
                  <button
                    disabled={provider === "vidsrc"}
                    style={{
                      backgroundColor: provider === "vidsrc" ? "red" : "",
                      fontWeight: provider === "vidsrc" ? "700" : "",
                      border: provider === "vidsrc" ? "" : "1px solid white",
                    }}
                    className=" hover:bg-slate-600  px-2 py-1 rounded disabled:opacity-50"
                  >
                    Source 1
                  </button>
                </Link>
                <Link
                  href={`/video/${type}/${id}/${
                    type === "tv"
                      ? `?season=${seasonData?.season_number}&episode=${epNo}&provider=twoEmbed`
                      : `?provider=twoEmbed`
                  }`}
                >
                  <button
                    disabled={provider === "twoEmbed"}
                    style={{
                      backgroundColor: provider === "twoEmbed" ? "red" : "",
                      fontWeight: provider === "twoEmbed" ? "700" : "",
                      border: provider === "twoEmbed" ? "" : "1px solid white",
                    }}
                    className=" hover:bg-slate-600  px-2 py-1 rounded disabled:opacity-50"
                  >
                    Source 2
                  </button>
                </Link>
                <Link
                  href={`/video/${type}/${id}/${
                    type === "tv"
                      ? `?season=${seasonData?.season_number}&episode=${epNo}&provider=super`
                      : `?provider=super`
                  }`}
                >
                  <button
                    disabled={provider === "super"}
                    style={{
                      backgroundColor: provider === "super" ? "red" : "",
                      fontWeight: provider === "super" ? "700" : "",
                      border: provider === "super" ? "" : "1px solid white",
                    }}
                    className=" hover:bg-slate-600  px-2 py-1 rounded disabled:opacity-50"
                  >
                    Source 3
                  </button>
                </Link>
                <Link
                  href={`/video/${type}/${id}/${
                    type === "tv"
                      ? `?season=${seasonData?.season_number}&episode=${epNo}&provider=smashystream`
                      : `?provider=smashystream`
                  }`}
                >
                  <button
                    disabled={provider === "smashystream"}
                    style={{
                      backgroundColor: provider === "smashystream" ? "red" : "",
                      fontWeight: provider === "smashystream" ? "700" : "",
                      border:
                        provider === "smashystream" ? "" : "1px solid white",
                    }}
                    className=" hover:bg-slate-600  px-2 py-1 rounded disabled:opacity-50"
                  >
                    Source 4
                  </button>
                </Link>
              </div>
              <div className="my-5 gap-2 flex font-bold">
                <Link
                  target="_blank"
                  href={`/info/${type || data.media_type}/${data.id}`}
                >
                  <button
                    className="
                  flex  border border-white transition-all py-1 disabled:border-black  disabled:text-white/60 disabled:bg-black/60 xl:justify-center gap-2 items-center w-fit px-3  font-semibold rounded-md"
                  >
                    <Info size={15} />
                    {type === "movie" || data.media_type === "movie"
                      ? "Movie Info"
                      : "Season Info"}
                  </button>
                </Link>
              </div>
            </div>
            {seasonData && (
              <div className="xl:pl-4 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:w-5/6 gap-4 rounded-lg overflow-hidden">
                {seasonData.episodes.map((e) => (
                  <div
                    className=" bg-gray-800 p-2 flex flex-col justify-between"
                    key={e.id}
                  >
                    <div>
                      <img
                        className=" rounded-sm"
                        src={createImageUrl(e.still_path, "w500")}
                        alt={e.name}
                      />
                      <div className="mt-2 flex flex-col gap-2">
                        <h1 className=" text-2xl font-semibold">{e.name}</h1>

                        <p className=" leading-tight text-md opacity-50">
                          {e.overview}
                        </p>
                        <div className="opacity-50">
                          <p>Avg. Runtime : {e.runtime} Minutes</p>
                          <p>Episode : {e.episode_number}</p>
                        </div>
                      </div>
                    </div>
                    <div className=" flex gap-2">
                      <Link
                        href={`/video/${type}/${id}?season=${e.season_number}&episode=${e.episode_number}`}
                        className=" px-2 py-1 font-semibold rounded-md bg-red-600 w-full justify-center  xl:w-fit  flex xl:justify-center gap-1 items-center"
                      >
                        <span>
                          <Play fill="white" size={15} />
                        </span>
                        <p>Play</p>
                      </Link>
                      <Link
                        target="_blank"
                        href={`/info/${type || data.media_type}/${data.id}`}
                        className=" px-2 py-1 font-semibold rounded-full border w-full justify-center  xl:w-fit  flex xl:justify-center gap-1 items-center"
                      >
                        <Info size={15} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
