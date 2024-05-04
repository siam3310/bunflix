import { AniwatchHome } from "@/components/aniwatch/aniwatch-home";
import  AniwatchHomeSkeleton  from "@/components/fallback-ui/aniwatch-home-skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Anime - Nextflix",
};

export default async function Anime() {
  return (
    <div className="pb-24">
        <Suspense fallback={<AniwatchHomeSkeleton/>}>
          <AniwatchHome />
        </Suspense>
    </div>
  );
}
