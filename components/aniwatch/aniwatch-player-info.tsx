import { fetchAniwatchEpisode, fetchAniwatchId } from "@/data/fetch-data";
import { Info, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

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
      <div className="xl:w-1/2 p-4 bg-black/30 ">
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
          <Link target="_blank" href={`/anime/${data.anime.info.id}`}>
            <button className=" rounded-lg px-3 py-1  w-fit flex items-center justify-center gap-2 transition-all  text-white border font-semibold">
              More Info <SquareArrowOutUpRight size={15} />
            </button>
          </Link>
        </div>
      </div>

      <div className="xl:w-1/2">
        <h1 className="text-3xl font-semibold py-4">Episode </h1>
        <div className="flex items-center mb-6">
          <ul className="h-[500px] bg-slate-500 overflow-y-scroll rounded-lg scrollbar-hide">
            {episodeData.episodes.map((individualEpisode, index) => (
              <Link
                key={individualEpisode.episodeId}
                href={`/animeWatch/en/${individualEpisode.episodeId}&episode=${individualEpisode.number}`}
              >
                <li
                  style={{
                    backgroundColor: episode == individualEpisode.number ? '#b91c1c' : index % 2 === 0 ? "#334155" : "#1e293b"
                  }}
                  className="px-4 py-2 bg-slate-700"
                >
                  {individualEpisode.number}. {individualEpisode.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
