import { HlsPlayer } from "@/components/aniwatch/hls-player";
import {  fetchAniwatchEpisodeSrc, fetchAniwatchId } from "@/lib/fetch-data";

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
  searchParams: { ep: string };
}) {

    const data:aniwatchEpisodeSrc = await fetchAniwatchEpisodeSrc(params.episodeId,searchParams.ep)

return <>
  <HlsPlayer id={params.episodeId} episode={searchParams.ep} track={data.tracks} videoSrc={data.sources[0].url}/>
  </>;
}