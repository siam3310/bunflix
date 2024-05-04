import  TmdbInfoSkeleton  from "@/components/fallback-ui/tmdb-info-skeleton";
import { TmdbMovieInfo } from "@/components/tmdb/tmdb-movie-info";
import { TmdbTvInfo } from "@/components/tmdb/tmdb-tv-info";
import { fetchTmdbInfo } from "@/lib/fetch-data";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { id: [string, number] };
}) {

  const data: tmdbTvInfo = await fetchTmdbInfo(params.id[0], params.id[1]);

  return {
    title: `${data.title || data.name || "Info"} - Nextflix`,
  };
}


export default async function Info({
  params,
}: {
  params: { id: [string, number] };
}) {

  if (params.id[0] === "tv") {
    return(
    <Suspense fallback={<TmdbInfoSkeleton/>}>
      <TmdbTvInfo id={params.id[1]} />
    </Suspense>
    )
  }

  return (
    <Suspense fallback={<TmdbInfoSkeleton/>}>
      <TmdbMovieInfo id={params.id[1]}/>
    </Suspense>
  );
}
