import MovieItem from "./movie-item";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import Link from "next/link";

export default async function MovieRow({
  title,
  type,
  endpoint,
  grid,
  page
}: {
  title: string;
  grid?:boolean
  type: string;
  endpoint: string;
  page?:number
}) {
  const data = await fetchData(endpoint);

  let currentPage = page 

  return (
      <div className=" mb-4">
        <div>
          <h1 className="font-bold text-3xl lg:text-5xl p-4 capitalize">
            {decodeURIComponent(title)}
          </h1>
        </div>
        <div className=" w-full overflow-x-scroll scrollbar-hide ">
          <div className={grid ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 w-full px-2 gap-y-4':"flex w-fit px-2 "}>
            {data.results?.map((movie: MovieResults) => (
              <MovieItem grid={grid} type={type} key={movie.id} movie={movie} />
            ))}
          </div>
        </div>


       {page && (
         <div className=" mt-4 w-full items-center text-5xl  justify-center flex gap-2">
         {page > 1 && (
           <>
             <Link
               href={`/categories/${title}/${type}/${--page}`}
             >
               <CircleArrowLeft/>
             </Link>
           </>
         )}
         <div>
           <p className="text-lg">{currentPage}</p>
         </div>
         <Link
           href={`/categories/${title}/${type}/${2+page}`}
         >
           <CircleArrowRight/>
         </Link>
       </div>
       )}
      </div>
  );
}

export async function fetchData(endpoint: string) {
  const data = await fetch(endpoint);
  if (!data.ok) {
    throw new Error("fetch failed");
  }
  return data.json();
}