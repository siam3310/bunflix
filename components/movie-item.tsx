import { createImageUrl } from "@/lib/create-image-url";
import { Info, Play, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export default function MovieItem({
  type,
  movie,
  grid,
}: {
  type: string;
  grid?: boolean;
  movie: MovieResults;
}) {
  const {
    id,
    title,
    backdrop_path,
    overview,
    first_air_date,
    synopsis,
    poster_path,
    image,
    release_date,
    name,
    media_type,
  } = movie;

  return (
    <div
      className={`relative inline-block text-white rounded-lg overflow-hidden mx-2 transition-all duration-200 h-[300px] ${
        grid ? "" : "w-[200px]"
      }`}
    >
      <img
        className={` size-full object-cover object-center`}
        src={
          image
            ? image
            : createImageUrl(poster_path ? poster_path : backdrop_path, "w500")
        }
        alt={title}
      />
      <div className="absolute h-full flex items-center justify-between flex-col top-0 left-0 w-full focus:hover:bg-red-700 transition-all bg-black/80 backdrop-blur-md opacity-0 hover:opacity-100  p-3 group">
        <div>
          <p
            className={` whitespace-normal font-semibold mb-2 leading-[16px] transition-all duration-[300ms]  group-hover:leading-[26px] text-xl xl:text-[24px] `}
          >
            {title ? title : name}
          </p>
          <div className=" flex gap-2">
            <p className="text-[13px] md:text-md opacity-10  duration-500 group-hover:opacity-70 ">
              {release_date ? release_date : first_air_date}
            </p>
            <p className=" opacity-70">|</p>
            <p className="text-[13px] capitalize md:text-md opacity-10  duration-500 group-hover:opacity-70 ">
              {media_type}
            </p>
          </div>
          <p
            className=" whitespace-normal line-clamp-2  duration-500 group-hover:opacity-70 
          text-[15px] pt-1 opacity-10"
          >
            {overview ? overview : synopsis}
          </p>
        </div>
        <div className="flex gap-2 w-full">
          <Link
            href={`/video/${
              type || media_type
            }/${id}/${type==='tv'||media_type==='tv'?'?season=1&episode=1&provider=vidsrc':'?provider=vidsrc'}`}
          >
            <div className=" rounded-full w-full p-4 transition-all text-xl flex items-center justify-start gap-2 hover:bg-red-700 ">
              <Play  size={20}/>
            </div>
          </Link>
          <Link target='_blank' href={`/info/${type || media_type}/${id}`}>
            <div className=" rounded-full w-full p-4 transition-all text-xl flex items-center justify-start gap-4 hover:bg-gray-400/30">
              <SquareArrowOutUpRight
                 size={20}/>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
