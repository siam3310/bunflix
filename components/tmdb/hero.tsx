"use client";
import { createImageUrl } from "@/lib/create-image-url";
import { useEffect, useState } from "react";
import { Info, Play, Star } from "lucide-react";
import Link from "next/link";
import {  SaveLocalMovie } from "./save-local-movie";

export default function Hero({ data }: { data: TmdbMovie }) {
  const [imageindex, setImageindex] = useState(0);

  const shownext = () => {
    if (imageindex >= 19) {
      setImageindex(0);
    } else setImageindex(imageindex + 1);
  };
  const showpre = () => {
    if (imageindex <= 1) {
      setImageindex(19);
    } else setImageindex(imageindex - 1);
  };

  // useEffect(() => {
  // const intervalId = setInterval(() => {
  //   shownext();
  // }, 8000);

  // return () => clearInterval(intervalId);
  // }, [imageindex])

  return (
    <div className=" w-full overflow-hidden">
      <div className=" flex w-fit ">
        {data?.results?.map((movie) => (
          <div
            key={movie.id}
            className=" relative h-screen w-screen transition-all duration-700 ease-in-out "
            style={{ translate: `${-100 * imageindex}%` }}
          >
            <div className="bg-gradient-to-b from-black/20 to-black/60 absolute h-full  w-full" />
            <img
              className=" h-full w-full object-cover flex-shrink-0 flex-grow-0 "
              src={createImageUrl(movie.backdrop_path, "original")}
              alt=""
            />
            <div className="xl:top-1/2 lg:w-2/5 px-8 md:p-0 bottom-12 md:left-12 text-white absolute ">
              <h1 className=" font-bold  text-4xl">{movie.title}</h1>
              <p className=" leading-5 my-4">{movie.overview}</p>
              <div className=" flex gap-2">
              <Link href={`/video/movie/${movie.id}?provider=vidsrc`} className=" px-4 py-2 font-semibold rounded-full bg-red-600  flex xl:justify-center gap-2 items-center">
                  <span>
                    <Play fill="white" size={15} />
                  </span>
                  <p>Play</p>
                </Link >
                <Link href={`/info/movie/${movie.id}`} className=" px-3 font-semibold rounded-full border flex xl:justify-center gap-2 items-center">
                    <Info size={15} />
                </Link>
               <SaveLocalMovie rounded item={movie}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
