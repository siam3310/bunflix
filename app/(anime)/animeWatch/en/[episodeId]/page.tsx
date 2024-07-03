import AnimeWatchPlayerInfo from "@/components/aniwatch/aniwatch-player-info";
import { HlsPlayer } from "@/components/aniwatch/hls-player";
import AnimeWatchPlayerInfoSkeleton from "@/components/fallback-ui/aniwatch-player-info-skeleton";
import { fetchAniwatchEpisodeSrcDub, fetchAniwatchId } from "@/data/fetch-data";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { episodeId: string };
}) {
  const data: aniwatchInfo = await fetchAniwatchId(params.episodeId);
  return {
    title: `${data.anime.info.name} - Nextflix`,
  };
}

export default async function AnimeWatch({
  params,
  searchParams,
}: {
  params: { episodeId: string };
  searchParams: { ep: string; episode: string | number };
}) {
  const data: aniwatchEpisodeSrc = await fetchAniwatchEpisodeSrcDub(
    params.episodeId,
    searchParams.ep
  );

  return (
    <>
      <HlsPlayer
        track={data.tracks}
        videoSrc={data.sources[0].url}
      />
      <Suspense fallback={<AnimeWatchPlayerInfoSkeleton />}>
        <AnimeWatchPlayerInfo
          id={params.episodeId}
          episode={searchParams.episode}
        />
      </Suspense>
    </>
  );
}
