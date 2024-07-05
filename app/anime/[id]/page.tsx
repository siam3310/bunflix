import { AniwatchInfo } from "@/components/aniwatch/aniwatch-info";
import AniwatchPlayer from "@/components/aniwatch/aniwatch-player";
import { fetchAniwatchEpisode, fetchAniwatchId } from "@/data/fetch-data";
import { CircleArrowDownIcon } from "lucide-react";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const data: aniwatchInfo = await fetchAniwatchId(params.id);

  return {
    title: `${data.anime.info.name} - Nextflix`,
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
        <AniwatchPlayer lang={searchParams.lang} episodeId={params.id} ep={searchParams.ep} />
      ) : (
        <h1 className="text-3xl font-semibold py-4 p-4 flex items-center gap-2">
          <CircleArrowDownIcon className="animate-bounce" />
          Select a episode
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
