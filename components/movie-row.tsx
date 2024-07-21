"use client";
import cache from "@/lib/cache";
import MovieItem from "./movie-item";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function MovieRow({
  title,
  type,
  endpoint,
  grid,
}: {
  title: string;
  grid?: boolean;
  type: string;
  endpoint: string;
}) {
  const [data, setData] = useState<tmdbMultiSearch>({
    page: 1,
    results: [],
    total_pages: 2,
    total_results: 12,
  });
  const [results, setResults] = useState<MovieResults[] | null>();
  const [page, setPage] = useState(1);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if(page===1){
      fetchData(`${endpoint}&page=1`, title.split(" ").join("")).then(
        (res: tmdbMultiSearch) => {
          setData(res);
          if (results) {
            const combinedResults = [...results, ...res.results];
            setResults(combinedResults);
          } else {
            setResults(res.results);
          }
        }
      );
    }
    if (inView && data?.page !== data?.total_pages && page>1) {
     
      setPage((prePage) => (prePage += 1));
      fetchData(`${endpoint}&page=${page}`, title.split(" ").join("")).then(
        (res: tmdbMultiSearch) => {
          setData(res);
          if (results) {
            const combinedResults = [...results, ...res.results];
            setResults(combinedResults);
          } else {
            setResults(res.results);
          }
        }
      );
    } else {
      fetchData(`${endpoint}&page=${page}`, title.split(" ").join("")).then(
        (res) => {
          setData(res);
        }
      );
    }
  }, [inView]);

  return (
    <div className=" mb-4">
      <div>
        <h1 className="font-bold text-3xl lg:text-5xl p-4 capitalize">
          {decodeURIComponent(title)}
        </h1>
      </div>
      <div className=" w-full overflow-x-scroll scrollbar-hide ">
        <div
          className={
            grid
              ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 w-full px-2 gap-y-4"
              : "flex w-fit px-2 "
          }
        >
          {results?.map((movie: MovieResults) => (
            <MovieItem grid={grid} type={type} key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      <div ref={ref} className="text-2xl p-3 font-semibold"></div>
    </div>
  );
}

export async function fetchData(endpoint: string, title: string) {
  const cacheKey = `${title}${endpoint}`;

  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    const response = await fetch(endpoint);
    const data = await response.json();
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data for ${title}`);
  }
}
