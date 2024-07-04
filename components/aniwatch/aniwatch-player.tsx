import { fetchAniwatchEpisodeSrcDub } from "@/data/fetch-data";
import { HlsPlayer } from "./hls-player";

export default async function AniwatchPlayer({
  episodeId,
  ep,
}: {
  episodeId: string;
  ep: string;
}) {
  const data: aniwatchEpisodeSrc = await fetchAniwatchEpisodeSrcDub(
    episodeId,
    ep
  );

  return (
    <>
      <HlsPlayer track={data.tracks} videoSrc={data.sources[0].url} />
    </>
  );
}
