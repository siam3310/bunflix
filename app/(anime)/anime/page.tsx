import AniwatchHome from "@/components/aniwatch/aniwatch-home";
import AniwatchSlider from "@/components/aniwatch/aniwatch-slider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anime - Nextflix",
};

export default async function Anime() {
  const data: aniwatchApi = await aniwatchHomeApi();

  return (
    <div className="pb-24 bg-black/80 min-h-screen">
      <AniwatchSlider anime={data} />
      <AniwatchHome anime={data} />
    </div>
  );
}

async function aniwatchHomeApi() {
  try {
    const response = await fetch(`${process.env.ANIWATCH_API}/anime/home`);
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Fetch failed at Anime Slider`);
  }
}
