import {
  fetchAniwatchEpisodeSrc,
  fetchAniwatchEpisodeSrcDub,
} from "@/data/fetch-data";
import { HlsPlayer } from "./hls-player";

export default async function AniwatchPlayer({
  episodeId,
  ep,
  lang,
  data,
  episode,
}: {
  episodeId: string;
  data: aniwatchInfo;
  ep: string;
  episode: number;
  lang: "english" | "japanesse";
}) {
  if (lang === "english") {
    const dub: aniwatchEpisodeSrc = await fetchAniwatchEpisodeSrcDub(
      episodeId,
      ep
    );

    return (
      <HlsPlayer
        data={data}
        lang={lang}
        episode={episode}
        ep={ep}
        episodeId={episodeId}
        track={dub.tracks}
        videoSrc={dub.sources[0].url}
      />
    );
  } else {
    const sub: aniwatchEpisodeSrc = await fetchAniwatchEpisodeSrc(
      episodeId,
      ep
    );

    return (
      <HlsPlayer
        data={data}
        lang={lang}
        episode={episode}
        ep={ep}
        episodeId={episodeId}
        track={sub.tracks}
        videoSrc={sub.sources[0].url}
      />
    );
  }
}
