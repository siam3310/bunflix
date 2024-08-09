import TmdbSlider from "@/components/tmdb/tmdb-slider";
import TmdbShowRow from "@/components/tmdb/tmdb-shows-row";
import endpoint from "@/data/apiEndpoint";
import { Metadata } from "next";
import { Suspense } from "react";
import TmdbHomeSkeleton from "@/components/fallback-ui/tmdb-home-row";
import cache from "@/lib/cache";

export const metadata: Metadata = {
  title: "Home - Nextflix",
};

export default async function Home() {
  const data: TmdbMovie = await fetchHeroData();

  return (
    <div className=" pb-24 bg-black/80">
      <TmdbSlider data={data} />
      <Suspense fallback={<TmdbHomeSkeleton />}>
        <TmdbShowRow
          title="Trending Movies"
          endpoint={endpoint.trendingMovies}
          type="movie"
        />
        <TmdbShowRow
          title="Upcoming Movies"
          endpoint={endpoint.upcomingMovies}
          type="movie"
        />
        <TmdbShowRow
          title="Trending Movies At The Moment"
          endpoint={endpoint.topRatedTvShows}
          type="tv"
        />
        <TmdbShowRow
          title="Now Playing in Theaters"
          endpoint={endpoint.nowPlayingMovies}
          type="movie"
        />
      </Suspense>
    </div>
  );
}

async function fetchHeroData() {
  const key = process.env.TMDB_KEY;
  const cacheKey = "tmdbHero";

  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${key}`
    );
    const data = await response.json();
    cache.set(cacheKey, data, 60 * 60 * 24);

    return data;
  } catch (error) {
    throw new Error("Failed to fetch Slider data");
  }
}
