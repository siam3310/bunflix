import { fetchAniwatchEpisode, fetchAniwatchId } from "@/lib/fetch-data";
import { Info, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { SaveLocalAnime } from "./save-local-anime";
import { SaveLocalAnimeEpisode } from "./save-local-anime-episode";

export default async function AnimeWatchPlayerInfo({
  id,
  episode,
}: {
  id: string;
  episode: string | number;
}) {
  const data: aniwatchInfo = await fetchAniwatchId(id);
  const episodeData: aniwatchEpisodeData = await fetchAniwatchEpisode(id);

  return (
    <div className="flex flex-col rounded-lg xl:flex-row gap-4 justify-between">
      <img
        className="-z-10 fixed top-0 size-full  object-cover blur-2xl "
        src={data.anime.info.poster}
        alt={data.anime.info.name}
      />
      <div className="xl:w-1/3 p-4 bg-black/30 ">
      
        <h1 className=" text-3xl font-semibold">{data.anime.info.name}</h1>
        <p>{data.anime.info.description}</p>
        <div className=" flex my-4 gap-2 opacity-40">
          <p className="flex gap-2">
            {data.anime.info.stats.duration}
            <span className="hidden xl:block">|</span>
          </p>
          <p className="flex gap-2">
            {data.anime.info.stats.type}
            <span className="hidden xl:block">|</span>
          </p>
          <p className="flex gap-2">
            {data.anime.info.stats.quality}
            <span className="hidden xl:block">|</span>
          </p>
        </div>
        <div className=" flex items-center gap-2">
        <Link target="_blank" href={`/anime/${data.anime.info.id}`} >
          <button className=" rounded-lg px-3 py-1  w-fit flex items-center justify-center gap-2 transition-all  text-white border font-semibold">
            More Info <SquareArrowOutUpRight size={15} />
          </button>
        </Link>
        <SaveLocalAnime px='px-3 py-2' item={data} /> 
        </div>

      </div>
      <div className=" xl:w-2/3  grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {episodeData.episodes.map((e) => (
          <div
            className=" h-[300px] flex flex-col justify-between p-4 rounded-lg bg-black/30"
            key={e.episodeId}
          >
            <div>
              {episode == e.number && (
                <p className=" flex items-center bg-red-600 font-bold text-sm px-2 py-1 rounded-lg mb-2 gap-2 opacity-80">
                  <Info size={15} />
                  Currently Playing
                </p>
              )}
              <h1 className=" text-lg font-semibold">{e.title}</h1>
              <p className=" opacity-60">Episode no. {e.number}</p>
            </div>
            <div>
            <SaveLocalAnimeEpisode px="px-3 my-2 py-1" text rounded item={e} />
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
          </div>
        ))}
      </div>
    </div>
  );
}
