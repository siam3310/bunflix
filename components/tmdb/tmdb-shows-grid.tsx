"use client";
import MovieItem from "@/components/movie-item";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function TmdbShowGrid({
  title,
  type,
  endpoint,
}: {
  title: string;
  type: string;
  endpoint: string;
}) {
  const [data, setData] = useState<tmdbMultiSearch>({
    page: 1,
    results: [],
    total_pages: 2,
    total_results: 12,
  });
  const [results, setResults] = useState<MovieResults[]>([]);
  const [page, setPage] = useState(1);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (data?.page !== data?.total_pages) {
      setPage((prePage) => (prePage += 1));
      fetchData(`${endpoint}&page=${page}`).then((res: tmdbMultiSearch) => {
        setData(res);
        if (results) {
          const combinedResults = [...results, ...res.results];
          setResults(combinedResults);
        } else {
          setResults(res.results);
        }
      });
    }
  }, [inView]);

  const pathname = usePathname();

  return (
    <div className=" mb-4">
      <div>
        <h1 className="font-bold text-3xl lg:text-5xl p-4 capitalize">
          {decodeURIComponent(title)}
        </h1>
      </div>
      <div className=" w-full overflow-x-scroll scrollbar-hide ">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4 px-2">
          {results?.map((movie) => (
            <MovieItem
              size={"h-[300px] lg:h-[400px] w-full"}
              type={type}
              key={movie.id}
              movie={movie}
            />
          ))}
          {(pathname === "/") === false && (
            <div ref={ref} className="text-2xl p-3 font-semibold"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function fetchData(endpoint: string) {
  try {
    const response = await fetch(endpoint, {
      
      cache:"no-store" ,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data `);
  }
}
