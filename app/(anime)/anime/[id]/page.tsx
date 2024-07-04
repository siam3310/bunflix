import { AniwatchInfo } from "@/components/aniwatch/aniwatch-info";
import AniwatchPlayer from "@/components/aniwatch/aniwatch-player";
import AniwatchInfoSkeleton from "@/components/fallback-ui/aniwatch-info-skeleton";
import { fetchAniwatchId } from "@/data/fetch-data";
import { CircleArrowDownIcon, HandIcon } from "lucide-react";
import { Suspense } from "react";

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
  searchParams: { ep: string; episode: number };
}) {
  return (
    <div className="bg-black/60 min-h-screen space-y-6 pb-24">
      {searchParams.ep ? (
        <AniwatchPlayer episodeId={params.id} ep={searchParams.ep} />
      ) : (
        <h1 className="text-3xl font-semibold my-2 p-4 flex items-center gap-2">
          <CircleArrowDownIcon className="animate-bounce" />
          Select a episode{" "}
        </h1>
      )}
      <Suspense fallback={<AniwatchInfoSkeleton />}>
        <AniwatchInfo id={params.id} currentEpisode={searchParams.episode} />
      </Suspense>
    </div>
  );
}
