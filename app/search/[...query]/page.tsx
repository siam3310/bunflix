import  AniwatchSearch  from "@/components/aniwatch/aniwatch-search";
import AnimeSearchFilter from "@/components/aniwatch/aniwatch-search-filter";
import SearchSkeleton from "@/components/fallback-ui/search-skeleton";
import TmdbSearch from "@/components/tmdb/tmdb-search";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { query: [string, string] };
}) {
  const type = params.query[0];
  const searchTerm = params.query[1];

  return {
    title: `'${decodeURIComponent(searchTerm)}' in ${
      type == "movie" ? "Movie" : type === "anime" ? "Anime" : "TV Shows"
    } - Nextflix`,
  };
}
export default async function Query({
  params,
  searchParams,
}: {
  params: { query: [string, string] };
  searchParams?: {
    type: AnimeType;
    lang: AnimeLanguage;
    sort: AnimeSort;
    status: AnimeStaus;
  };
}) {
  const type = params.query[0];
  const searchTerm = params.query[1];

  if (type === "anime") {
    const data: aniwatchSearch = await fetchAniwatchSearch(
      searchTerm,
      searchParams?.type,
      searchParams?.lang,
      searchParams?.sort,
      searchParams?.status
    );

    return (
      <div className=" bg-black/80 min-h-screen">
        <Suspense fallback={<SearchSkeleton />}>
          <div className="pb-24 p-4 md:flex-row flex-col flex gap-4">
            <AnimeSearchFilter search={searchTerm} />
            <AniwatchSearch initialData={data} search={searchTerm}/>
          </div>
        </Suspense>
      </div>
    );
  }

  return (
    <div className=" bg-black/80 min-h-screen">
      <Suspense fallback={<SearchSkeleton />}>
        <TmdbSearch search={searchTerm} />
      </Suspense>
    </div>
  );
}

type AnimeType = "all" | "ona" | "special" | "movie" | "tv" | "ova" | "music";
type AnimeLanguage = "sub-&-dub" | "sub" | "dub";
type AnimeStaus =
  | "finished-airing"
  | "currently-airing"
  | "not-yet-aired"
  | "all";
type AnimeSort =
  | "default"
  | "recently-added"
  | "name-az"
  | "most-watched"
  | "score"
  | "released-date"
  | "recently-updated";

async function fetchAniwatchSearch(
  searchTerm: string,
  type?: AnimeType,
  language?: AnimeLanguage,
  sort?: AnimeSort,
  status?: AnimeStaus
) {
  try {
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/search?q=${searchTerm}&page=1&type=${
        type ? type : "all"
      }$&language=${language ? language : "sub-&-dub"}&sort=${
        sort ? sort : "default"
      }&status=${status ? status : "all"}`,
      { cache: "no-store" }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Search failed in Search`);
  }
}
