import  TmdbHomeSkeleton  from "@/components/fallback-ui/tmdb-home-row";
import Hero from "@/components/tmdb/hero";
import MovieRow from "@/components/movie-row";
import { fetchHeroData } from "@/lib/fetch-data";
import endpoint from "@/services/apiEndpoint";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Nextflix",
};

export default async function Home() {
  const data: TmdbMovie = await fetchHeroData();

  return (
   <div className=" pb-24">
    <Hero data={data} />
    <Suspense fallback={<TmdbHomeSkeleton/>}>
    <MovieRow title="Trending Movies" endpoint={endpoint.trendingMovies} type="movie" />
    <MovieRow title="Upcoming Movies" endpoint={endpoint.upcomingMovies} type="movie" />
    <MovieRow title="Trending Movies At The Moment" endpoint={endpoint.topRatedTvShows} type="tv" />
    <MovieRow title="Now Playing in Theaters" endpoint={endpoint.nowPlayingMovies} type="movie" />
    </Suspense>
   </div>
  );
}
