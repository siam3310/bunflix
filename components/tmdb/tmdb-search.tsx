import Link from "next/link";
import MovieItem from "../movie-item";
import { fetchTmdbMultiSearch } from "@/lib/fetch-data";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

export default async function TmdbSearch({page,type,search}:{type:string,page:number,search:string}){

  const data:tmdbMultiSearch = await fetchTmdbMultiSearch(search,page) 
  
  let currentPage = page 

  // console.log(data);
  
    return(
      <div className=" m-2 pb-24">
      <h1 className=" ml-2 mb-2 text-3xl xl:text-5xl font-semibold">Search</h1>
        <div className=" grid grid-cols-2 lg:grid-cols-3  xl:grid-cols-5 2xl:grid-cols-6 gap-y-4 ">
          {data.results.map((e)=>(
            <MovieItem key={e.id} grid type={e.media_type} movie={e}/>
          ))}
        </div>
        {page && (
         <div className=" mt-4 w-full items-center text-5xl  justify-center flex gap-2">
         {page > 1 && (
           <>
             <Link
               href={`/search/${type}/${search}/${--page}`}
             >
               <CircleArrowLeft/>
             </Link>
           </>
         )}
         <div>
           <p className="text-lg">{currentPage}</p>
         </div>
         <Link
           href={`/search/${type}/${search}/${++currentPage}`}
         >
           <CircleArrowRight/>
         </Link>
       </div>
       )}
      </div>
    )
}