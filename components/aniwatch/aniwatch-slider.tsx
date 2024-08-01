"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AniwatchSlider({ anime }: { anime: aniwatchApi }) {
  const [imageindex, setImageindex] = useState(0);
  const [preferAnimation, setPreferAnimation] = useState(false);

  const shownext = () => {
    if (imageindex >= 3) {
      setImageindex(0);
    } else setImageindex(imageindex + 1);
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
    <>
      <div className="p-8  ">
        <div className="flex relative h-[600px]">
          {anime.spotlightAnimes?.splice(0,4)?.map((res, i) => (
            <div key={res.id} className="absolute size-full">
              <img
                style={{
                  width: i === imageindex ? "" : "0%",
                  height:i === imageindex ? "" : "0%",
                }}
                className="h-full w-full transition-all duration-500 object-cover"
                src={res.poster}
                alt={res.name}
              />
            </div>
          ))}
        </div>
        <div className=" flex overflow-x-scroll gap-4">
        {/* {anime.spotlightAnimes?.splice(0,4)?.map((res,i)=>(
          <div key={res.id} className="flex min-w-[250px] h-32 relative">
            <img src={res.poster} className="w-full h-full object-cover" alt="" />
            <div className="h-4 animate-timer   bg-white/70 absolute bottom-0"></div>
          </div>
        ))} */}
        </div>
      </div>
    </>
  );
}
