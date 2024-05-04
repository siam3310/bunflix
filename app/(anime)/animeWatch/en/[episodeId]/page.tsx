import { HlsPlayer } from "@/components/aniwatch/hls-player";
import { fetchAniwatchEpisodeSrcDub, fetchAniwatchId } from "@/lib/fetch-data";

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
  searchParams: { ep: string,episode:string | number };
}) {
  const data: aniwatchEpisodeSrc = await fetchAniwatchEpisodeSrcDub(
    params.episodeId,
    searchParams.ep
  );

  return (
    <>
      <HlsPlayer id={params.episodeId} episode={searchParams.episode} track={data.tracks} videoSrc={data.sources[0].url} />
    </>
  );
}
