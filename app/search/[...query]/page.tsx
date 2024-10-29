import AniwatchSearch from "@/components/aniwatch/aniwatch-search";
import AnimeSearchSidebar from "@/components/aniwatch/aniwatch-search-sidebar";
import SearchSkeleton from "@/components/fallback-ui/search-skeleton";
import TmdbSearch from "@/components/tmdb/tmdb-search";
import { Suspense } from "react";

type Params = Promise<{ query: [string, string] }>;
type SearchParams = Promise<{
  type: AnimeType;
  lang: AnimeLanguage;
  sort: AnimeSort;
  status: AnimeStaus;
  page?: string;
}>;

export async function generateMetadata({ params }: { params: Params }) {
  const { query } = await params;
  const type = query[0];
  const searchTerm = query[1];

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
  params: Params;
  searchParams?: SearchParams
}) {
  const { query } = await params;
  const awaitedSearchParams = await searchParams;

  const type = query[0];
  const searchTerm = query[1];

  if (type === "anime") {
    const data: aniwatchSearch = await fetchAniwatchSearch(
      searchTerm,
      awaitedSearchParams?.page
    );

    return (
      <div className=" bg-black/80 min-h-screen">
        <Suspense fallback={<SearchSkeleton />}>
          <div className="pb-24 p-4 md:flex-row flex-col flex gap-4">
            <AnimeSearchSidebar animeData={data} search={searchTerm} />
            <AniwatchSearch animeData={data} searchTerm={searchTerm} />
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

async function fetchAniwatchSearch(searchTerm: string, page?: number | string) {
  try {
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/search?q=${searchTerm}&page=${
        page ? page : 1
      }`,
      { cache: "no-store" }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Search failed in Search`);
  }
}
