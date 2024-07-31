import AniwatchContinueWatching from "@/components/aniwatch/aniwatch-continue-watching";
import AniwatchHome from "@/components/aniwatch/aniwatch-home";
import AniwatchSlider from "@/components/aniwatch/aniwatch-slider";
import { aniwatchHomeApi } from "@/data/fetch-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anime - Nextflix",
};

export default async function Anime() {
  const data: aniwatchApi = await aniwatchHomeApi();

  return (
    <div className="pb-24 bg-black/80">
       <AniwatchSlider anime={data} />
      <AniwatchContinueWatching />
      <AniwatchHome anime={data} />
    </div>
  );
}
