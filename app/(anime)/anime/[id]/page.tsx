import { AniwatchInfo } from "@/components/aniwatch/aniwatch-info";
import AniwatchPlayer from "@/components/aniwatch/aniwatch-player";
import EpisodeSelector from "@/components/aniwatch/episode-selector";
import { CircleArrowDownIcon } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { ep: string; num: string; lang: "english" | "japanesse" };
}): Promise<Metadata> {
  const data: aniwatchInfo = await fetchAniwatchId(params.id);

  const title = `${
    searchParams.num ? `${searchParams.num}` : "1"
  }  - ${data.anime.info.name}`;
  return {
    title,
    description: data.anime.info.description,
    openGraph: {
      title,
      siteName: "Nextflix",
      type: "video.movie",
      description: data.anime.info.description,
      images: data.anime.info.poster,
    },
    twitter: {
      title,
      description: data.anime.info.description,
      images: data.anime.info.poster,
    },
  };
}

export default async function Anime({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { episode: string; lang: "english" | "japanesse"; num: string };
}) {
  const data: aniwatchInfo = await fetchAniwatchId(params.id);
  const episode: aniwatchEpisodeData = await fetchAniwatchEpisode(params.id);

  const escapedEpisode = searchParams?.episode?.replace("?", "&");

  return (
    <div className="bg-black/60 min-h-screen space-y-6 pb-24">
      <div className="flex lg:flex-row flex-col">
        <AniwatchPlayer
          data={data}
          lang={searchParams.lang}
          ep={
            searchParams.episode
              ? escapedEpisode
              : episode.episodes[0].episodeId
          }
        />
        <EpisodeSelector
          lang={searchParams.lang}
          episode={episode}
          currentEpisode={
            searchParams.episode
              ? escapedEpisode
              : episode.episodes[0].episodeId
          }
          currentEpisodeNum={
            searchParams.num ? searchParams.num : episode.episodes[0].number
          }
          data={data}
        />
      </div>

      <AniwatchInfo data={data} />
    </div>
  );
}

async function fetchAniwatchEpisode(seasonId: string) {
  try {
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/episodes/${seasonId}`,
      { cache: "no-store" }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Fetch failed for Season`);
  }
}

async function fetchAniwatchId(id: string): Promise<aniwatchInfo> {
  try {
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/info?id=${id}`,
      { cache: "no-store" }
    );

    const data: aniwatchInfo = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Failed fetching details for Anime`);
  }
}
