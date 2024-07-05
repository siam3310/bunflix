import { AniwatchHome } from "@/components/aniwatch/aniwatch-home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anime - Nextflix",
};

export default async function Anime() {
  return (
    <div className="pb-24 bg-black/80">
      <AniwatchHome />
    </div>
  );
}
