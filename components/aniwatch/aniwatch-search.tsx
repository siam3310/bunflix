"use client";

import { MicIcon, CaptionsIcon, View } from "lucide-react";
// import { CaptionsIcon, MicIcon, SquareArrowOutUpRight } from "lucide-react";
// import Link from "next/link";

// export async function AniwatchSearch({ data }: { data: aniwatchSearch }) {

//   return (
//     <>
//
//     </>
//   );
// }

import MovieItem from "../movie-item";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import Link from "next/link";

export default function AniwatchSearch({
  search,
  initialData,
}: {
  search: string;
  initialData: aniwatchSearch;
}) {
  const [data, setData] = useState<aniwatchSearch>(initialData);
  const [results, setResults] = useState<Anime[]>([]);
  const [page, setPage] = useState(data?.currentPage || 1);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (data?.currentPage === initialData.totalPages) {
      return;
    }
    setPage((data.currentPage += 1));
    fetch(`/api/search?q=${search}&type=anime&page=${page}`)
      .then((response) => {
        if (!response.ok) {
          toast.error("Error please try again");
        }
        return response.json();
      })
      .then((res: aniwatchSearch) => {
        setData(res);
        if (results) {
          const combinedResults = [...results, ...res?.animes];
          setResults(combinedResults);
        } else {
          setResults(res.animes);
        }
      });
  }, [inView]);


  return (
    <div className=" p-2 pb-24 w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-6 w-full gap-3 bg-green-200 min-h-screen">
        {results.map((episode) => (
          <Link
            key={episode.id}
            href={`/anime/${episode.id}`}
            className="min-w-[150px] w-full lg:w-full h-[300px] rounded-md overflow-hidden group  relative text-end"
          >
            <img
              className="w-full h-full object-cover absolute top-0 group-hover:scale-105 transition-all"
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
      <div ref={ref} className="text-2xl p-3 font-semibold">
        {/* {data?.currentPage !== data?.totalPages ? (
          <p>Loading...</p>
        ) : (
          <p>You&apos;ve Reached the End of the road</p>
        )} */}
      </div>
    </div>
  );
}
