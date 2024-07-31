"use client";
import MovieItem from "../movie-item";
import { fetchTmdbMultiSearch } from "@/data/fetch-data";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function TmdbSearch({ search }: { search: string }) {
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
    if (inView && data?.page !== data?.total_pages) {
      setPage((prePage) => (prePage += 1));
      fetchTmdbMultiSearch(search, page).then((res: tmdbMultiSearch) => {
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

  return (
    <div className=" p-2 pb-24">
      <h1 className=" ml-2 mb-2 text-3xl xl:text-5xl font-semibold">Search</h1>

      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 ">
        {results?.map((e) => (
          <MovieItem key={e.id} size={"w-full h-[300px]"} type={e.media_type} movie={e} />
        ))}
      </div>
      <div ref={ref} className="text-2xl p-3 font-semibold">
        {data?.page !== data?.total_pages ? (
          <p>Loading...</p>
        ) : (
          <p>You&apos;ve Reached the End of the road</p>
        )}
      </div>
    </div>
  );
}
