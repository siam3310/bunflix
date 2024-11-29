import CategoriesSkeleton from "@/components/fallback-ui/categories-skeleton";
import TmdbShowGrid from "@/components/tmdb/tmdb-shows-grid";
import { Suspense } from "react";

type Params = Promise<{ id: [string, string, number] }>;

export async function generateMetadata({ params }: { params: Params }) {
  const {id} = await params
  const word = id[0];

  const capitaziledWord = word.charAt(0).toUpperCase() + word.slice(1);

  return {
    title: `${decodeURIComponent(capitaziledWord)} - Nextflix`,
    description: "Nextflix clone built with Next.js and Tailwind CSS",
  };
}

export default async function Page({ params }: { params: Params }) {
  const {id} = await params
  const encodedString = id[0];
  const decodedString = encodedString.replace(/%20/g, "");

  const key = process.env.TMDB_KEY

  const baseUrl = "https://api.themoviedb.org/3"
  const endpoint = {
    popularMovies:`${baseUrl}/movie/popular?api_key=${key}`,
    trendingMovies:`${baseUrl}/trending/movie/week?api_key=${key}&region=IN&with_original_language=hi`,
    upcomingMovies:`${baseUrl}/movie/upcoming?api_key=${key}`,
    topRatedMovies:`${baseUrl}/movie/top_rated?api_key=${key}`,
    nowPlayingMovies:`${baseUrl}/movie/now_playing?api_key=${key}`,
    animeMovies:`${baseUrl}/discover/movie?api_key=${key}&with_keywords=210024|222243`,
    netflix:`${baseUrl}/discover/tv?api_key=${key}&with_networks=213`,
    amazon:`${baseUrl}/discover/tv?api_key=${key}&with_networks=1024`,
    disneyPlus:`${baseUrl}/discover/tv?api_key=${key}&with_networks=2739`,
    hulu:`${baseUrl}/discover/tv?api_key=${key}&with_networks=453`,
    appleTv:`${baseUrl}/discover/tv?api_key=${key}&with_networks=2552`,
    hbo:`${baseUrl}/discover/tv?api_key=${key}&with_networks=49`,
    paramountPlus:`${baseUrl}/discover/tv?api_key=${key}&with_networks=4330`,
    peacock:`${baseUrl}/discover/tv?api_key=${key}&with_networks=3353`,
    topRatedTvShows:`${baseUrl}/tv/top_rated?api_key=${key}&region=US`,
    anime:`${baseUrl}/discover/tv?api_key=${key}&with_keywords=210024|222243`,
}

  let movieEndpoint: string = "";
  type EndpointKey = keyof typeof endpoint;

  Object.keys(endpoint).forEach((thisEndpointName: string) => {
    if (decodedString === thisEndpointName) {
      movieEndpoint = endpoint[decodedString as EndpointKey];
    }
  });

  return (
    <>
      <div className="pb-24 bg-black/80 min-h-screen">
        <Suspense fallback={<CategoriesSkeleton />}>
          <TmdbShowGrid
            endpoint={movieEndpoint}
            type={id[1]}
            title={id[0]}
          />
        </Suspense>
      </div>
    </>
  );
}
