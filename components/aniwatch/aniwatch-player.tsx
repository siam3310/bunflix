"use server";
import Player from "./art-player";

export default async function AniwatchPlayer({
  // episodeId,
  ep,
  data,
  lang,
}: {
  // episodeId: string;
  ep: string;
  data: aniwatchInfo;
  lang: "english" | "japanesse";
}) {
  const escapedEpisode = ep?.replace("&", "?");

  if (lang === "english") {
    const server = await fetchAniwatchEpisodeServer(escapedEpisode);

    const dub: aniwatchEpisodeSrc = await fetchAniwatchEpisodeSrcDub(
      escapedEpisode,
      server.dub[0].serverName
    );

    return (
      <Player src={`/api/proxy/${dub?.sources[0]?.url}`} track={dub.tracks} />
    );
  } else {
    const server = await fetchAniwatchEpisodeServer(escapedEpisode);

    const sub: aniwatchEpisodeSrc = await fetchAniwatchEpisodeSrc(
      escapedEpisode,
      server.sub[0].serverName
    );

    return (
      <Player src={`/api/proxy/${sub?.sources[0]?.url}`} track={sub.tracks} />
    );
  }
}

async function fetchAniwatchEpisodeSrc(episode: string, server: string) {
  try {
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/episode-srcs?id=${episode}&server=${
        server ? server : "vidstreaming"
      }`,
      { cache: "no-store" }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Fetch failed Episode Sources japanesse `);
  }
}

async function fetchAniwatchEpisodeSrcDub(episode: string, server: string) {
  try {
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/episode-srcs?id=${episode}&server=${
        server ? server : "vidstreaming"
      }&category=dub`,
      { cache: "no-store" }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Fetch failed Episode Sources english`);
  }
}

async function fetchAniwatchEpisodeServer(episode: string) {
  try {
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/servers?episodeId=${episode}`,
      { cache: "no-store" }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Fetch failed Episode Sources english`);
  }
}
