"use client";

import { Home, List, Search, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useScroll } from "framer-motion";
import SearchInput from "./search-input";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const categories = [
    {
      id: 1,
      name: "Popular Movies",
      link: "/categories/popular%20Movies/movie/1",
      img: "https://image.tmdb.org/t/p/w500//kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
    },
    {
      id: 2,
      name: "Trending Movies",
      link: "/categories/trending%20Movies/movie/1",
      img: "https://image.tmdb.org/t/p/w500//8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    },
    {
      id: 3,
      name: "Upcoming Movies",
      link: "/categories/upcoming%20Movies/movie/1",
      img: "https://image.tmdb.org/t/p/w500//f4oZTcfGrVTXKTWg157AwikXqmP.jpg",
    },
    {
      id: 4,
      name: "Top Rated Movies",
      link: "/categories/top%20Rated%20Movies/movie/1",
      img: "https://image.tmdb.org/t/p/w500//39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    },
    {
      id: 5,
      name: "Now Playing Movies",
      link: "/categories/now%20Playing%20Movies/movie/1",
      img: "https://image.tmdb.org/t/p/w500//7IJ7F8tX7IAkpUdaGovOBJqORnJ.jpg",
    },
    {
      id: 6,
      name: "Anime Movies",
      link: "/categories/anime%20Movies/movie/1",
      img: "https://image.tmdb.org/t/p/w500//gQwzIIyhgsFiYiXI7fNpTUvWghP.jpg",
    },

    {
      id: 7,
      name: "Anime TV Shows",
      link: "/categories/anime/tv/1",
      img: "https://image.tmdb.org/t/p/w500//geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg",
    },
  ];

  const [imageindex, setImageindex] = useState(0);
  const [navIndex, setNavIndex] = useState(2);
  const [openSearch, setOpenSearch] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const  scrollY  = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY); 
      setIsScrolled(true)
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); 

  return (
    <>
      <motion.div
        initial={{ y: 250 }}
        animate={{ y: openSearch ? 20 : 250 }}
        className=" w-full px-4 fixed bottom-0  flex items-center justify-center z-[51]"
      >
        <div className="  bg-gray-700 h-full pb-8 rounded-t-xl overflow-hidden w-[700px]">
          <SearchInput onClick={() => setOpenSearch(!openSearch)} />
        </div>
      </motion.div>

      <nav className="outline-none group focus:outline-none z-20 fixed bottom-4 left-1/2 transform -translate-x-1/2 ">
        <motion.div
          style={{ y: isHome ? "300px" : "0px" }}
          animate={
            isHome ? (isScrolled ? { y: "0px" } : { y: "100px" }) : { y: "0px" }
          }
          transition={{ duration: 0.5 }}
          className="flex gap-3 items-center w-fit relative justify-evenly py-3 px-4  rounded-full bg-white/30 border border-white/40 backdrop-blur-sm"
        >
          <div
            style={{ translate: `${52 * navIndex}px` }}
            className="group-hover:bg-blue-500/70 animate-pulse duration-[5000ms] size-10  left-4 rounded-full absolute transition-all  ease-in-out"
          />
          <Link
            onClick={() => setNavIndex(0)}
            onMouseEnter={() => setNavIndex(0)}
            href={"/anime"}
            style={{
              backgroundColor:pathname.split('/')[1]==='anime' ? '#dc2626' : '',
              borderRadius:'50px'
            }}
          >
            <div className="relative group p-2 w-fit ">
              <svg className=" size-6 fill-white">
                <title>AniList</title>
                <path d="M24 17.53v2.421c0 .71-.391 1.101-1.1 1.101h-5l-.057-.165L11.84 3.736c.106-.502.46-.788 1.053-.788h2.422c.71 0 1.1.391 1.1 1.1v12.38H22.9c.71 0 1.1.392 1.1 1.101zM11.034 2.947l6.337 18.104h-4.918l-1.052-3.131H6.019l-1.077 3.131H0L6.361 2.948h4.673zm-.66 10.96-1.69-5.014-1.541 5.015h3.23z" />
              </svg>
              <h1 className=" absolute  bottom-0 transform -translate-x-1/2 left-1/2 text-nowrap group-hover:-translate-y-14 text-transparent delay-200 group-hover:text-black transition-all scale-0 group-hover:scale-100 px-2 group-hover:bg-white rounded-md">
                Anime
              </h1>
            </div>
          </Link>
          <Link
            href={"/"}
            onMouseEnter={() => setNavIndex(1)}
            onClick={() => setNavIndex(1)}
            style={{
              backgroundColor:isHome ? '#dc2626' : '',
              borderRadius:'50px'
            }}
          >
            <div className="relative group p-2 w-fit ">
              <Home color="white" className=" size-6" />
              <h1 className=" absolute  bottom-0 transform -translate-x-1/2 left-1/2 text-nowrap group-hover:-translate-y-14 text-transparent delay-200 group-hover:text-black transition-all scale-0 group-hover:scale-100 px-2 group-hover:bg-white rounded-md">
                Home
              </h1>
            </div>
          </Link>
          <motion.button
            onClick={() => {
              setNavIndex(3), setOpenSearch(!openSearch);
            }}
            onMouseEnter={() => setNavIndex(2)}
            className="outline-none focus:outline-none"
            style={{
              backgroundColor:pathname.split('/')[1]==='search' ? '#dc2626' : '',
              borderRadius:'50px'
            }}
          >
            <div className="relative group p-2 w-fit">
              <Search color="white" className=" size-6" />
              <h1 className=" absolute  bottom-0 transform -translate-x-1/2 left-1/2 text-nowrap group-hover:-translate-y-14 text-transparent delay-200 group-hover:text-black transition-all scale-0 group-hover:scale-100 px-2 group-hover:bg-white rounded-md">
                Search
              </h1>
            </div>
          </motion.button>

          <div className=" cursor-pointer">
            <div className="relative group p-2 w-fit ">
              <List color="white" className=" size-6" />
              <div
                className=" absolute cursor-default -translate-x-1/2 left-1/2 bottom-0 transform text-nowrap translate-y-32 group-hover:-translate-y-14  delay-200 
              text-black text-transparent transition-all scale-0 
                 group-hover:scale-100 rounded-md overflow-hidden h-[350px] w-[450px] p-4 flex  backdrop:blur-lg  bg-white/80"
              >
                <div className=" w-1/2 h-full overflow-hidden rounded-xl">
                  <div className=" flex w-fit h-full">
                    {categories.map((e) => (
                      <div
                        key={e.id}
                        className=" relative transition-all duration-700 ease-in-out w-[240px]  overflow-hidden "
                        style={{ translate: `${-100 * imageindex}%` }}
                      >
                        <img
                          className=" h-full w-full object-cover flex-shrink-0 flex-grow-0 "
                          src={e.img}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className=" px-3 w-1/2">
                  <h1 className="text-center font-bold text-2xl mb-2 text-black">
                    Categories :
                  </h1>
                  {categories.map((e) => (
                    <Link target="_blank" href={e.link} key={e.id}>
                      <h1
                        className=" text-black text-lg text-center hover:bg-black/20 rounded-md transition-all hover:font-semibold"
                        onMouseEnter={() => setImageindex(e.id - 1)}
                      >
                        {e.name}
                      </h1>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </nav>
    </>
  );
}
