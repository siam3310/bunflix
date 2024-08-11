import { HlsPlayer } from "./hls-player";
import cache from "@/lib/cache";

export default async function AniwatchPlayer({
  episodeId,
  ep,
  lang,
  data,
  episode,
  episodeData,
}: {
  episodeId: string;
  data: aniwatchInfo;
  episodeData: aniwatchEpisodeData;
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
        episode={episodeData}
        data={data}
        lang={lang}
        currentEpisode={episode}
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
        episode={episodeData}
        data={data}
        lang={lang}
        currentEpisode={episode}
        ep={ep}
        episodeId={episodeId}
        track={sub.tracks}
        videoSrc={sub.sources[0].url}
      />
    );
  }
}

async function fetchAniwatchEpisodeSrc(episodeId: string, episode: string) {
  const cacheKey = `aniwatchEpisodeSourceJp${episodeId}${episode}`;

  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/episode-srcs?id=${episodeId}?ep=${episode}&server=vidstreaming`
    );
    const data = await response.json();
    cache.set(cacheKey, data, 60 * 60 * 24);

    return data;
  } catch (error) {
    throw new Error(`Fetch failed Episode Sources japanesse `);
  }
}

async function fetchAniwatchEpisodeSrcDub(episodeId: string, episode: string) {
  const cacheKey = `aniwatchEpisodeSourceEn${episodeId}${episode}`;

  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/episode-srcs?id=${episodeId}?ep=${episode}&server=vidstreaming&category=dub`
    );
    const data = await response.json();
    cache.set(cacheKey, data, 60 * 60 * 24);

    return data;
  } catch (error) {
    throw new Error(`Fetch failed Episode Sources english`);
  }
}
