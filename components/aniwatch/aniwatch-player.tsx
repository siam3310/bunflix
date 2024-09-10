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
  if (!ep) return;
  if (lang === "english") {
    const server = await fetchAniwatchEpisodeServer(episodeId, ep);

    const dub: aniwatchEpisodeSrc = await fetchAniwatchEpisodeSrcDub(
      episodeId,
      ep,
      server.dub[0].serverName
    );

    return (
      <Player src={`/api/proxy/${dub?.sources[0]?.url}`} track={dub.tracks} />
    );
  } else {
    const server = await fetchAniwatchEpisodeServer(episodeId, ep);

    const sub: aniwatchEpisodeSrc = await fetchAniwatchEpisodeSrc(
      episodeId,
      ep,
      server.sub[0].serverName
    );


    return (
      <Player src={`/api/proxy/${sub?.sources[0]?.url}`} track={sub.tracks} />
    );
  }
}

async function fetchAniwatchEpisodeSrc(id: string, ep: string, server: string) {
  const response = await fetch(
    `${process.env.ANIWATCH_API}/anime/episode-srcs?id=${id}?ep=${ep}&server=${
      server ? server : "vidstreaming"
    }`,
    { cache: "force-cache" }
  );

  const data = await response.json();
  return data;
}

async function fetchAniwatchEpisodeSrcDub(
  id: string,
  ep: string,
  server: string
) {
  try {
    const response = await fetch(
      `${
        process.env.ANIWATCH_API
      }/anime/episode-srcs?id=${id}?ep=${ep}&server=${
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

async function fetchAniwatchEpisodeServer(id: string, ep: string) {
  try {
    const response = await fetch(
      `${process.env.ANIWATCH_API}/anime/servers?episodeId=${id}?ep=${ep}`,
      { cache: "no-store" }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Fetch failed Episode Sources english`);
  }
}
