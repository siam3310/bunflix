import { fetchAniwatchSearch } from "@/data/fetch-data";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export async function AniwatchSearch({ searchTerm }: { searchTerm: string }) {
  const data: aniwatchSearch = await fetchAniwatchSearch(searchTerm);

  return (
    <>
      <div className="pb-24 m-2 ">
        <h1 className=" ml-2 mb-2 text-3xl font-semibold">Search</h1>
        <div className="grid grid-cols-2 lg:grid-cols-3  xl:grid-cols-5 2xl:grid-cols-6 gap-2  ">
          {data.animes.map((e) => (
            <div
              key={e.id}
              className={`relative inline-block text-white rounded-lg overflow-hidden m-2 w-fit transition-all duration-200 h-[400px] `}
            >
              <img
                className={` size-full object-cover object-center`}
                src={e.poster}
                alt={e.name}
              />
              <div className="absolute h-full flex items-center justify-between flex-col top-0 left-0 w-full transition-all bg-black/80 backdrop-blur-md opacity-0 hover:opacity-100  p-3 group">
                <div>
                  <p
                    className={` whitespace-normal font-semibold mb-2 leading-[16px] transition-all duration-[300ms]  group-hover:leading-[28px] text-2xl xl:text-[32px] `}
                  >
                    {e.name}
                  </p>
                  <p className="text-[13px] md:text-md opacity-10  duration-500 group-hover:opacity-70 ">
                    {e.type}
                  </p>
                  <p
                    className=" whitespace-normal line-clamp-4  duration-500 group-hover:opacity-70 
                text-[15px] pt-1 opacity-10"
                  >
                    Dub : {e.episodes.dub}
                  </p>{" "}
                  <p
                    className=" whitespace-normal line-clamp-4  duration-500 group-hover:opacity-70 
                text-[15px] pt-1 opacity-10"
                  >
                    Sub : {e.episodes.sub}
                  </p>
                </div>
                <div className=" w-full">
                  <Link href={`/anime/${e.id}`}>
                    <button className=" rounded-lg py-1 bg-white/90 flex items-center justify-center gap-2 transition-all  text-black font-semibold w-full">
                      More Info <SquareArrowOutUpRight size={15} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
