import CategoriesSkeleton from "@/components/fallback-ui/categories-skeleton";
import TmdbShowGrid from "@/components/tmdb/tmdb-shows-grid";
import endpoint from "@/data/apiEndpoint";
import { Suspense } from "react";

type Params = Promise<{ id: [string, string, number] }>;

export async function generateMetadata({ params }: { params: Params }) {
  const {id} = await params
  const word = id[0];

  const capitaziledWord = word.charAt(0).toUpperCase() + word.slice(1);

  return {
    title: `${decodeURIComponent(capitaziledWord)} - Nextflix`,
    description: "Nextflix clone built with Next.js and Tailwind CSS",
  };
}

export default async function Page({ params }: { params: Params }) {
  const {id} = await params
  const encodedString = id[0];
  const decodedString = encodedString.replace(/%20/g, "");

  let movieEndpoint: string = "";
  type EndpointKey = keyof typeof endpoint;

  Object.keys(endpoint).forEach((thisEndpointName: string) => {
    if (decodedString === thisEndpointName) {
      movieEndpoint = endpoint[decodedString as EndpointKey];
    }
  });

  return (
    <>
      <div className="pb-24 bg-black/80 min-h-screen">
        <Suspense fallback={<CategoriesSkeleton />}>
          <TmdbShowGrid
            endpoint={movieEndpoint}
            type={id[1]}
            title={id[0]}
          />
        </Suspense>
      </div>
    </>
  );
}
