import MovieRow from "@/components/movie-row";
import  CategoriesSkeleton  from "@/components/fallback-ui/categories-skeleton";
import endpoint from "@/data/apiEndpoint";
import { Suspense } from "react";


export async function generateMetadata({ params }: { params: { id: string } }) {
  const word = params.id[0];

  const capitaziledWord = word.charAt(0).toUpperCase() + word.slice(1);

  return {
    title: `${decodeURIComponent(capitaziledWord)} - Nextflix`,
    description: "Nextflix clone built with Next.js and Tailwind CSS",
  };
}

export default async function Page({
  params,
}: {
  params: { id: [string, string, number] };
}) {
  const encodedString = params.id[0];
  const decodedString = encodedString.replace(/%20/g, "");

  let movieEndpoint: string = "";
  type EndpointKey = keyof typeof endpoint;

  Object.keys(endpoint).forEach((thisEndpointName: string) => {
    if (decodedString === thisEndpointName) {
      movieEndpoint = endpoint[decodedString as EndpointKey];
    }
  });

  const newPage = movieEndpoint

  return (
    <>
      <div className="pb-24 bg-black/80 min-h-screen">
        <Suspense fallback={<CategoriesSkeleton/>}>
        <MovieRow
          grid
          endpoint={newPage}
          type={params.id[1]}
          title={params.id[0]}
        />
        </Suspense>
      </div>
    </>
  );
}
