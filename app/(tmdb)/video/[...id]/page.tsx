import { TmdbVideo } from "@/components/tmdb/tmdb-video";
import { fetchSeasonData, fetchTmdbInfo } from "@/lib/fetch-data";

export async function generateMetadata({
  params,
}: {
  params: { id: [string, string] };
}) {
  const type = params.id[0];
  const id = params.id[1];
  const data: MovieResults = await fetchTmdbInfo(type, id);

  return {
    title: `${data.title || data.name} - Nextflix`,
    description: "Nextflix clone built with Next.js and Tailwind CSS",
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: [string, string] };
  searchParams: {
    season: number | string;
    episode: number | string;
    provider: string;
  };
}) {
  const type = params.id[0];
  const id = params.id[1];
  const data: MovieResults = await fetchTmdbInfo(type, id);

  let seasonData: tmdbEpisodesInfo | undefined;
  if (type === "tv") {
    seasonData = await fetchSeasonData(
      data.id,
      searchParams.season || data.seasons[0].season_number
    );
  }

  const vidsrcMovieApi = `https://vidsrc.to/embed/movie/${id}`;
  const twoEmbedMovieApi = `https://www.2embed.cc/embed/${id}`;
  const superMovieApi = `https://multiembed.mov/?video_id=${id}`;
  const smashystreamMovieApi = `https://embed.smashystream.com/playere.php?tmdb=${id}`;

  const vidsrcTvapi = `https://vidsrc.to/embed/tv/${id}/${searchParams.season}/${searchParams.episode}`;
  const twoEmbedtvApi = `https://www.2embed.cc/embedtv/${id}&s=${searchParams.season}&e=${searchParams.episode}`;
  const superTvApi = `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${searchParams.season}&e=${searchParams.episode}`;
  const smashystreamTvApi = `https://player.smashy.stream/tv/${id}?s=${searchParams.season}&e=${searchParams.episode}`;


  let url = "";
  if (type === "tv") {
    switch (searchParams.provider) {
      case "vidsrc":
        url = vidsrcTvapi;
        break;
      case "twoEmbed":
        url = twoEmbedtvApi;
        break;
      case "smashystream":
        url = smashystreamTvApi;
        break;
      case "super":
        url = superTvApi;
        break;
      default:
        url=vidsrcTvapi
    }
  } else {
    switch (searchParams.provider) {
      case "vidsrc":
        url = vidsrcMovieApi;
        break;
      case "twoEmbed":
        url = twoEmbedMovieApi;
        break;
      case "super":
        url = superMovieApi;
        break;
      case "smashystream":
        url = smashystreamMovieApi;
        break;
        default:
          url=vidsrcMovieApi
    }
  }

  return (
    <div className="mb-24">
      <TmdbVideo
        type={type}
        id={id}
        url={url}
        epNo={searchParams.episode}
        provider={searchParams.provider}
        seasonData={seasonData}
        data={data}
      />
    </div>
  );
}
