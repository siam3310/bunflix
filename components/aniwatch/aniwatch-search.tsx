import { CaptionsIcon, MicIcon, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export async function AniwatchSearch({ data }: { data: aniwatchSearch }) {

  return (
    <>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full gap-3  ">
          {data.animes.map((episode) => (
             <Link
             key={episode.id}
             href={`/anime/${episode.id}`}
             className="min-w-[150px] w-full lg:w-full h-[300px] rounded-md overflow-hidden group  relative text-end"
           >
             <img
               className="w-full h-full object-cover absolute top-0 group-hover:scale-105 transition-all"
               src={episode.poster}
               alt={episode.name}
             />

             <div className=" absolute bottom-0 left-0 p-2 bg-gradient-to-br from-transparent to-black/80 transition-all group-hover:backdrop-blur-md size-full flex items-end flex-col justify-end capitalize">
               <h1 className="text-xl font-semibold">{episode.name}</h1>
               <div className="flex text-sm gap-1">
                 <p>{episode.type}</p>
                 <p className="flex items-center gap-1 bg-purple-500/70 rounded-sm  px-1">
                   <MicIcon size={10} />
                   {episode.episodes.dub || "NA"}
                 </p>
                 <p className="flex items-center gap-1 bg-yellow-500/80 rounded-sm  px-1">
                   <CaptionsIcon size={10} />
                   {episode.episodes.sub}
                 </p>
               </div>
             </div>
           </Link>
          ))}
        </div>
    </>
  );
}