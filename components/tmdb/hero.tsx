"use client";
import { createImageUrl } from "@/utils/create-image-url";
import { useEffect, useState } from "react";
import {
  Info,
  Pause,
  PauseCircle,
  Play,
  PlayCircle,
  PlayCircleIcon,
  PlayIcon,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function Hero({ data }: { data: TmdbMovie }) {
  const [imageindex, setImageindex] = useState(0);
  const [preferAnimation, setPreferAnimation] = useState(false);

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

  useEffect(() => {
    if (preferAnimation) {
      const intervalId = setInterval(() => {
        shownext();
      }, 8000);

      return () => clearInterval(intervalId);
    }
  }, [imageindex, preferAnimation]);


  return (
    <div className=" w-full overflow-hidden">
      <div className=" flex w-fit relative">
        {data?.results?.map((movie) => (
          <div
            key={movie.id}
            className=" relative h-screen w-screen transition-all duration-1000 ease-in-out "
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
              <div className=" flex justify-between ">
                <div className="flex gap-2  ">
                  <Link
                    href={`/video/movie/${movie.id}?provider=vidsrc`}
                    className=" px-4 py-2 font-semibold rounded-full bg-red-600  flex xl:justify-center gap-2 items-center"
                  >
                    <span>
                      <Play fill="white" size={15} />
                    </span>
                    <p>Play</p>
                  </Link>
                  <Link
                    href={`/info/movie/${movie.id}`}
                    className=" px-3 font-semibold rounded-full border flex xl:justify-center gap-2 items-center"
                  >
                    <Info size={15} />
                  </Link>
                </div>
                <div className=" px-3 font-semibold rounded-full flex xl:justify-center gap-2 items-center">
                  {preferAnimation ? (
                    <button
                      className="xl:hidden"
                      onClick={() => setPreferAnimation(false)}
                    >
                      <PauseCircle size={30} />
                    </button>
                  ) : (
                    <button
                      className="xl:hidden"
                      onClick={() => setPreferAnimation(true)}
                    >
                      <PlayCircle size={30} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className=" absolute bottom-2 hidden xl:flex xl:left-8 px-4 py-2 xl:bg-black/30 rounded-full gap-8 items-center">
          <div className=" flex items-center">
            {preferAnimation ? (
              <button onClick={() => setPreferAnimation(false)}>
                <PauseCircle size={20} />
              </button>
            ) : (
              <button onClick={() => setPreferAnimation(true)}>
                <PlayCircle size={20} />
              </button>
            )}
          </div>
          <div className="py-2 flex gap-2">
            {data.results.map((_, i) => (
              <span
                key={_.id}
                className={`hidden z-50 py-1 px-3 opacity-80 cursor-pointer transition-all duration-150 rounded-full xl:flex items-center justify-center`}
                style={{ backgroundColor: i == imageindex ? "red" : "" }}
                onClick={() => setImageindex(i)}
              >
                {i == imageindex ? (
                  <>{1 + i}</>
                ) : (
                  <span className=" flex items-center justify-center">
                    <div className=" bg-white size-2 rounded-full" />
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
