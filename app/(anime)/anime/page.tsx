import AniwatchContinueWatching from "@/components/aniwatch/aniwatch-continue-watching";
import AniwatchHome from "@/components/aniwatch/aniwatch-home";
import AniwatchSlider from "@/components/aniwatch/aniwatch-slider";
import cache from "@/lib/cache";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anime - Nextflix",
};

export default async function Anime() {
  const data: aniwatchApi = await aniwatchHomeApi();

  return (
    <div className="pb-24 bg-black/80 min-h-screen">
      <AniwatchSlider anime={data} />
      <AniwatchContinueWatching />
      <AniwatchHome anime={data} />
    </div>
  );
}


async function aniwatchHomeApi() {
  const cacheKey = `animeHome`;
  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
    const response = await fetch(`${process.env.ANIWATCH_API}/anime/home`);
    const data = await response.json();
    cache.set(cacheKey, data, 60 * 60 * 24 * 7);

    return data;
  } catch (error) {
    throw new Error(`Fetch failed at Anime Slider`);
  }
}

