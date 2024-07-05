import { fetchAniwatchEpisodeServer, fetchAniwatchEpisodeSrc, fetchAniwatchEpisodeSrcDub } from "@/data/fetch-data";
import { HlsPlayer } from "./hls-player";

export default async function AniwatchPlayer({
  episodeId,
  ep,
  lang
}: {
  episodeId: string;
  ep: string;
  lang: "english" | "japanesse"
}) {
  const dub: aniwatchEpisodeSrc = await fetchAniwatchEpisodeSrcDub(
    episodeId,
    ep,
  );

  const sub:aniwatchEpisodeSrc = await fetchAniwatchEpisodeSrc(
    episodeId,
    ep 
  )
  
  if(lang==="english") {
     return <HlsPlayer track={dub.tracks} videoSrc={dub.sources[0].url} />
  } else {
    return <HlsPlayer track={sub.tracks} videoSrc={sub.sources[0].url} />
  }
}
