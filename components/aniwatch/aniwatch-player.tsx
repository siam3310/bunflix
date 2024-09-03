"use server";
import Player from "./art-player";

export default async function AniwatchPlayer({
  episodeId,
  ep,
  lang,
}: {
  episodeId: string;
  ep: string;
  lang: "english" | "japanesse";
}) {
  const htmlTagPattern = /<[^>]+>/g;

  if (lang === "english") {
    const server = await fetchAniwatchEpisodeServer(episodeId, ep);
    const dub: aniwatchEpisodeSrc = await fetchAniwatchEpisodeSrcDub(
      episodeId,
      ep,
      server.dub[0].serverName
    );

    const englishSub = dub.tracks?.filter((sub) => sub.label === "English");

    let data;
    if (englishSub.length > 0) {
      const res = await fetch(englishSub[0].file, {
        
        cache: "no-store",
      });
      data = await res.text();
    }
    const escapedSub = data?.replace(htmlTagPattern, "");

    return (
      <Player
        src={`/api/proxy/${dub?.sources[0]?.url}`}
        track={dub.tracks}
        englishSub={escapedSub}
      />
    );
  } else {
    const server = await fetchAniwatchEpisodeServer(episodeId, ep);

    const sub: aniwatchEpisodeSrc = await fetchAniwatchEpisodeSrc(
      episodeId,
      ep,
      server.sub[0].serverName
    );

    const englishSub = sub.tracks?.filter((sub) => sub.label === "English");

    let data;
    if (englishSub) {
      const res = await fetch(englishSub[0].file, {
        
        cache: "no-store",
      });
      data = await res.text();
    }
    const escapedSub = data?.replace(htmlTagPattern, "");

    return (
      <Player
        src={`/api/proxy/${sub?.sources[0]?.url}`}
        track={sub.tracks}
        englishSub={escapedSub}
      />
    );
  }
}

async function fetchAniwatchEpisodeSrc(
  episodeId: string,
  episode: string,
  server: string
) {
  try {
    const response = await fetch(
      `${
        process.env.ANIWATCH_API
      }/anime/episode-srcs?id=${episodeId}?ep=${episode}&server=${
        server ? server : "vidstreaming"
      }`,
      {  cache: "no-store" }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Fetch failed Episode Sources japanesse `);
  }
}

async function fetchAniwatchEpisodeSrcDub(
  episodeId: string,
  episode: string,
  server: string
) {
  try {
    const response = await fetch(
      `${
        process.env.ANIWATCH_API
      }/anime/episode-srcs?id=${episodeId}?ep=${episode}&server=${
        server ? server : "vidstreaming"
      }&category=dub`,
      {  cache: "no-store" }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Fetch failed Episode Sources english`);
  }
}

async function fetchAniwatchEpisodeServer(episodeId: string, episode: string) {
  try {
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/servers?episodeId=${episodeId}?ep=${episode}`,
      {  cache: "no-store" }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Fetch failed Episode Sources english`);
  }
}
