import { TmdbVideo } from "@/components/tmdb/tmdb-video";
import { createImageUrl } from "@/utils/create-image-url";

export async function generateMetadata({
  params,
}: {
  params: { id: [string, string] };
}) {
  const type = params.id[0];
  const id = params.id[1];
  const data: MovieResults = await fetchTmdbInfo(type, id);
  const title = `${data.title || data.name} - Nextflix`;
  const image = createImageUrl(
    data.poster_path || data.backdrop_path,
    "original"
  );
  const description = data.overview || data.synopsis;
  return {
    title,
    description: description,
    openGraph: {
      title,
      siteName: "Nextflix",
      type: "video.movie",
      description: description,
      images: image,
    },
    twitter: {
      title,
      description: description,
      images: image,
    },
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
        url = vidsrcTvapi;
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
        url = vidsrcMovieApi;
    }
  }

  return (
    <div>
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

async function fetchTmdbInfo(type: string, id: number | string) {
  const key = process.env.TMDB_KEY;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${key}`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data for ${id}`);
  }
}

async function fetchSeasonData(
  series_id: number | string,
  season_number: number | string
) {
  const key = process.env.TMDB_KEY;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}?api_key=${key}`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data for ${series_id}`);
  }
}
