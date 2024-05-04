import { aniwatchHomeApi } from "@/lib/fetch-data";
import { Link2, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export async function AniwatchHome() {
  const data: aniwatchApi = await aniwatchHomeApi();

  return (
    <>
      <h1 className=" p-4 font-bold text-3xl">Spotlight Anime</h1>
      <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        {data.spotlightAnimes.map((e) => (
          <div
            key={e.id}
            className={`relative inline-block text-white rounded-lg overflow-hidden  m-2 transition-all duration-200 `}
          >
            <img
              className={`w-full h-[300px] object-cover `}
              src={e.poster}
              alt={e.name}
            />
            <div className="absolute h-full flex items-center justify-between flex-col top-0 left-0 w-full transition-all bg-black/80 backdrop-blur-md opacity-0 hover:opacity-100 p-3  xl:pl-3 group">
              <div>
                <p
                  className={` whitespace-normal font-semibold mb-2 leading-[16px] transition-all duration-[300ms]  group-hover:leading-[24px] text-xl xl:text-xl`}
                >
                  {e.name}
                </p>
                <p className="text-[13px] md:text-md opacity-10  duration-500 group-hover:opacity-70 ">
                  {e.episodes.dub}
                </p>
                <p
                  className=" whitespace-normal line-clamp-4  duration-500 group-hover:opacity-70 
                    text-[15px] pt-1 opacity-10"
                >
                  {e.description}
                </p>
              </div>
              <div className=" w-full">
                <Link target="_blank" href={`/anime/${e.id}`}>
                  <button className=" rounded-lg py-1 bg-white/90 flex items-center justify-center gap-2 transition-all  text-black font-semibold w-full">
                    More Info <SquareArrowOutUpRight size={15} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className=" p-4 font-bold text-3xl">Treanding Anime</h1>
      <div className="  grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        {data.trendingAnimes.map((e) => (
          <div
            key={e.id}
            className={`relative inline-block text-white rounded-lg overflow-hidden  m-2 transition-all duration-200 `}
          >
            <img
              className={`w-full h-[300px] object-cover `}
              src={e.poster}
              alt={e.name}
            />
            <div className="absolute h-full flex  justify-between flex-col top-0 left-0 w-full transition-all bg-black/80 backdrop-blur-md opacity-0 hover:opacity-100 p-3  xl:pl-3 group">
              <div className=" flex flex-col justify-between h-full">
                <p
                  className={` whitespace-normal font-semibold mb-2 leading-[16px] transition-all duration-[300ms]  group-hover:leading-[24px] text-xl xl:text-2xl`}
                >
                  {e.name}
                </p>

                <div className=" w-full">
                  <Link target="_blank" href={`/anime/${e.id}`}>
                    <button className=" rounded-lg py-1 bg-white/90 flex items-center justify-center gap-2 transition-all  text-black font-semibold w-full">
                      More Info <SquareArrowOutUpRight size={15} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className=" p-4 font-bold text-3xl">Top Upcoming Anime</h1>
      <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 mb-24">
        {data.topUpcomingAnimes.map((e) => (
          <div
            key={e.id}
            className={`relative inline-block text-white rounded-lg overflow-hidden  m-2 transition-all duration-200 `}
          >
            <img
              className={`w-full h-[300px] object-cover `}
              src={e.poster}
              alt={e.name}
            />
            <div className="absolute h-full flex  justify-between flex-col top-0 left-0 w-full transition-all bg-black/80 backdrop-blur-md opacity-0 hover:opacity-100 p-3  xl:pl-3 group">
              <div>
                <p
                  className={` whitespace-normal font-semibold mb-2 leading-[16px] transition-all duration-[300ms]  group-hover:leading-[24px] text-xl xl:text-2xl`}
                >
                  {e.name}
                </p>
                <p className="text-[13px] md:text-md opacity-10  duration-500 group-hover:opacity-70 ">
                  {e.duration}
                </p>
                <p className="text-[13px] md:text-md opacity-10  duration-500 group-hover:opacity-70 ">
                  {e.type}
                </p>
                <p className="text-[13px] md:text-md opacity-10  duration-500 group-hover:opacity-70 ">
                  {e.episodes.dub}
                </p>
                <p className="text-[13px] md:text-md opacity-10  duration-500 group-hover:opacity-70 ">
                  {e.episodes.sub}
                </p>
              </div>
              <div className=" w-full">
                <Link target="_blank" href={`/anime/${e.id}`}>
                  <button className=" rounded-lg py-1 bg-white/90 flex items-center justify-center gap-2 transition-all  text-black font-semibold w-full">
                    More Info <SquareArrowOutUpRight size={15} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
