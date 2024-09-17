import { AniwatchInfo } from "@/components/aniwatch/aniwatch-info";
import AniwatchPlayer from "@/components/aniwatch/aniwatch-player";
import EpisodeSelector from "@/components/aniwatch/episode-selector";
import { CircleArrowDownIcon } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { ep: string; num: string; lang: "english" | "japanesse" };
}): Promise<Metadata> {
  const data: aniwatchInfo = await fetchAniwatchId(params.id);

  const title = `${searchParams.num ? `${searchParams.num}` : "1"}  - ${
    data.anime?.info.name
  }`;
  return {
    title,
    description: data.anime?.info.description,
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
  searchParams: {
    episode: string;
    ep: string;
    lang: "english" | "japanesse";
    num: string;
  };
}) {
  const data: aniwatchInfo = await fetchAniwatchId(params.id);
  const episode: aniwatchEpisodeData = await fetchAniwatchEpisode(params.id);

  // const escapedEpisode = searchParams?.episode?.replace("?", "&");

  if (!searchParams.ep) {
    redirect(`/anime/${episode.episodes[0].episodeId}&lang=japanesse&num=1`);
  }

  return (
    <div className="bg-black/60 min-h-screen space-y-6 pb-24">
      <div className="flex lg:flex-row flex-col">
        <AniwatchPlayer
          episodeId={params.id}
          lang={searchParams.lang}
          ep={searchParams.ep}
        />
        <EpisodeSelector
          lang={searchParams.lang}
          episode={episode}
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
      { cache:"no-store" }
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
      { cache:"no-store" }
    );

    const data: aniwatchInfo = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Failed fetching details for Anime`);
  }
}
