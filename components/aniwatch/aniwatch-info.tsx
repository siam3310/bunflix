import { fetchAniwatchEpisode, fetchAniwatchId } from "@/lib/fetch-data";
import { BadgePlus, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { SaveLocalAnime } from "./save-local-anime";

export async function AniwatchInfo({ id }: { id: string }) {
  const data: aniwatchInfo = await fetchAniwatchId(id);
  const episode: aniwatchEpisodeData = await fetchAniwatchEpisode(id);

  return (
    <div className="p-4 bg-black/60">
        <img
        className="-z-10 fixed top-0 size-full object-cover blur-2xl "
        src={data.anime.info.poster}
        alt={data.anime.info.name}
      />
      <div className=" lg:flex ">
        <img
          className="w-full lg:w-fit rounded-md h-[400px] object-cover"
          src={data.anime.info.poster}
          alt={data.anime.info.name}
        />
        <div className=" lg:mt-0 mt-6 lg:px-4">
          <h1 className=" my-2 text-4xl font-semibold">
            {data.anime.info.name}
          </h1>
          <p className=" leading-6 text-[18px]">
            {data.anime.info.description}
          </p>
          <div className=" my-4 flex flex-col xl:flex-row gap-2 opacity-70">
            <p className=" flex gap-2">
              {data.anime.moreInfo.studios}
              <span className=" hidden xl:block">|</span>
            </p>
            <p className=" flex gap-2">
              {data.anime.moreInfo.duration}
              <span className=" hidden xl:block">|</span>
            </p>
            <p className=" flex gap-2">
              {data.anime.moreInfo.status}
              <span className=" hidden xl:block">|</span>
            </p>
            <p className=" flex gap-2">
              {data.anime.moreInfo.japanese}
              <span className=" hidden xl:block">|</span>
            </p>
            <p className=" flex gap-2">
              Sub : {data.anime.info.stats.episodes.sub}
              <span className=" hidden xl:block">|</span>
            </p>
            <p className=" flex gap-2">
              Dub : {data.anime.info.stats.episodes.dub}
              <span className=" hidden xl:block">|</span>
            </p>
          </div>
          <div className=" flex gap-2 items-center">
          <Link
            href={"#season"}
            className="py-1 px-2 rounded-full border transition-all hover:bg-white/20 w-fit flex gap-2 items-center justify-between"
          >
            <BadgePlus size={15} />
            Additional Seasons
          </Link>
          <SaveLocalAnime px="px-3 py-1" text rounded item={data} />
          </div>
        </div>
      </div>

      <div className=" mt-4 mb-24">
        <div className="">
          <h1 className="font-semibold text-4xl">Episodes</h1>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {episode.episodes.map((e) => (
              <div
                className=" h-[250px] flex flex-col justify-between p-4 rounded-lg bg-black/30 backdrop-blur-md"
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
                        <button className="w-full py-1 transition-all hover:font-semibold rounded-lg text-lg hover:bg-red-600">
                          English
                        </button>
                      </Link>
                      <Link
                        href={`/animeWatch/en/${e.episodeId}&episode=${e.number}`}
                        className=" p-3 hover:bg-red-600 rounded-lg "
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
                        <button className=" w-full py-1 transition-all hover:font-semibold rounded-lg text-lg hover:bg-red-600">
                          Japanesse
                        </button>
                      </Link>
                      <Link
                        href={`/animeWatch/jp/${e.episodeId}&episode=${e.number}`}
                        className=" p-3 hover:bg-red-600 rounded-lg "
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
        <div id="season">
          <h1 className="font-semibold my-4 text-4xl">Seasons</h1>
          <div className=" mt-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {data.seasons.map((e) => (
              <div
                key={e.id}
                className=" p-4 rounded-lg bg-black/30 flex flex-col items-center justify-between"
              >
                 <div>
                 <img
                    className=" h-[250px] rounded-l w-full object-cover "
                    src={e.poster}
                    alt={e.title}
                  />
                  <p className=" opacity-65 leading-6 my-2 font-bold text-2xl">
                    {e.title}
                  </p>
                  <p className=" opacity-65">{e.name}</p>
                 </div>
                <Link className=" w-full" href={`/anime/${e.id}`}>
                <button className=" rounded-lg py-1 bg-white/90 flex items-center justify-center gap-2 transition-all  text-black font-semibold w-full mt-8">
                      More Info <SquareArrowOutUpRight size={15} />
                    </button>
                </Link>
              </div>
            ))}
          </div>
          {data.seasons.length == 0 && <p>No Additional Seasons !</p>}
        </div>
      </div>
    </div>
  );
}
