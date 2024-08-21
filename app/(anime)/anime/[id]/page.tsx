import { AniwatchInfo } from "@/components/aniwatch/aniwatch-info";
import AniwatchPlayer from "@/components/aniwatch/aniwatch-player";
import { CircleArrowDownIcon } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { ep: string; episode: string; lang: "english" | "japanesse" };
}): Promise<Metadata> {
  const data: aniwatchInfo = await fetchAniwatchId(params.id);

  const title = `${
    searchParams.episode ? `${searchParams.episode}` : "Select a Episode"
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
  searchParams: { ep: string; episode: number; lang: "english" | "japanesse" };
}) {
  const data: aniwatchInfo = await fetchAniwatchId(params.id);
  const episode: aniwatchEpisodeData = await fetchAniwatchEpisode(params.id);

  return (
    <div className="bg-black/60 min-h-screen space-y-6 pb-24">
      {searchParams.ep ? (
        <AniwatchPlayer
          data={data}
          episodeData={episode}
          lang={searchParams.lang}
          episode={searchParams.episode}
          episodeId={params.id}
          ep={searchParams.ep}
        />
      ) : (
        <h1 className="text-3xl font-semibold py-4 p-4 flex items-center gap-2">
          <CircleArrowDownIcon className="animate-bounce" />
          Select a Episode
        </h1>
      )}
      <AniwatchInfo
        data={data}
        lang={searchParams.lang}
        episode={episode}
        currentEpisode={searchParams.episode}
      />
    </div>
  );
}

async function fetchAniwatchEpisode(seasonId: string) {
  try {
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/episodes/${seasonId}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Fetch failed for SeasonID`);
  }
}

async function fetchAniwatchId(id: string): Promise<aniwatchInfo> {

  try {
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/info?id=${id}`
    );

    const data: aniwatchInfo = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Failed fetching details for Anime`);
  }
}
