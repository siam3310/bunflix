import Hero from "@/components/tmdb/tmdb-slider";
import TmdbShowRow from "@/components/tmdb/tmdb-shows-row";
import { fetchHeroData } from "@/data/fetch-data";
import endpoint from "@/data/apiEndpoint";
import { Metadata } from "next";
import { Suspense } from "react";
import TmdbHomeSkeleton from "@/components/fallback-ui/tmdb-home-row";

export const metadata: Metadata = {
  title: "Home - Nextflix",
};

export default async function Home() {
  const data: TmdbMovie = await fetchHeroData();

  return (
   <div className=" pb-24 bg-black/80">
    <Hero data={data} />
    <Suspense fallback={<TmdbHomeSkeleton />}>
    <TmdbShowRow title="Trending Movies" endpoint={endpoint.trendingMovies} type="movie" />
    <TmdbShowRow title="Upcoming Movies" endpoint={endpoint.upcomingMovies} type="movie" />
    <TmdbShowRow title="Trending Movies At The Moment" endpoint={endpoint.topRatedTvShows} type="tv" />
    <TmdbShowRow title="Now Playing in Theaters" endpoint={endpoint.nowPlayingMovies} type="movie" />
    </Suspense>
   </div>
  );
}
