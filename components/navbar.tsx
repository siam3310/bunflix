"use client";

import {
  CrownIcon,
  Home,
  PopcornIcon,
  Search,
  TrendingUpIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import SearchInput from "./search-input";
import { usePathname } from "next/navigation";
import NavLink from "./nav-link";
import { useSearchBarFocus } from "@/context/searchContext";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAnime = pathname === "/anime";
  const isPopular =
    pathname.split("/")[1] === "categories" &&
    pathname.split("/")[2] === "popular%20Movies";
  const isTrending =
    pathname.split("/")[1] === "categories" &&
    pathname.split("/")[2] === "trending%20Movies";
  const isTopRated =
    pathname.split("/")[1] === "categories" &&
    pathname.split("/")[2] === "top%20Rated%20Movies";

  const [navIndex, setNavIndex] = useState(2);

  const { isSearchOpen, setIsSearchOpen } = useSearchBarFocus();

  const navLinks = [
    {
      id: 1,
      icon: <Home color="white" className=" size-6" />,
      linkName: "Home",
      href: "/",
      currentRoute: isHome,
      onMouseEnter: () => setNavIndex(0),
      onClick: () => setNavIndex(0),
    },
    {
      id: 2,
      icon: (
        <svg className=" size-6 fill-white">
          <title>AniList</title>
          <path d="M24 17.53v2.421c0 .71-.391 1.101-1.1 1.101h-5l-.057-.165L11.84 3.736c.106-.502.46-.788 1.053-.788h2.422c.71 0 1.1.391 1.1 1.1v12.38H22.9c.71 0 1.1.392 1.1 1.101zM11.034 2.947l6.337 18.104h-4.918l-1.052-3.131H6.019l-1.077 3.131H0L6.361 2.948h4.673zm-.66 10.96-1.69-5.014-1.541 5.015h3.23z" />
        </svg>
      ),
      linkName: "Anime",
      href: "/anime",
      currentRoute: isAnime,
      onMouseEnter: () => setNavIndex(1),
      onClick: () => setNavIndex(1),
    },
    {
      id: 3,
      icon: <PopcornIcon color="white" className=" size-6" />,
      linkName: "Popular Movies",
      href: "/categories/popular%20Movies/movie/1",
      currentRoute: isPopular,
      onMouseEnter: () => setNavIndex(2),
      onClick: () => setNavIndex(2),
    },
    {
      id: 4,
      icon: <TrendingUpIcon color="white" className=" size-6" />,
      linkName: "Trending Movies",
      href: "/categories/trending%20Movies/movie/1",
      currentRoute: isTrending,
      onMouseEnter: () => setNavIndex(3),
      onClick: () => setNavIndex(3),
    },
    {
      id: 5,
      icon: <CrownIcon color="white" className=" size-6" />,
      linkName: "Top Rated Movies",
      href: "/categories/top%20Rated%20Movies/movie/1",
      currentRoute: isTopRated,
      onMouseEnter: () => setNavIndex(4),
      onClick: () => setNavIndex(4),
    },
  ];

  const [isSearchHovered, setisSearchHovered] = useState(false);


  return (
    <>
      <nav className="outline-none group focus:outline-none z-20 fixed bottom-4 left-1/2 transform -translate-x-1/2 ">
        <div        
          className="flex gap-3 items-center w-fit relative justify-evenly py-3 px-4  rounded-full bg-white/30 border border-white/40 backdrop-blur-sm"
        >
          <div
            style={{ translate: `${52 * navIndex}px` }}
            className="group-hover:bg-white duration-&lsqb;5000ms&rsqb; h-2 w-[40px] bottom-0 left-4 absolute transition-all  ease-in-out"
          />

          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              onClick={link.onClick}
              onMouseEnter={link.onMouseEnter}
              currentRoute={link.currentRoute}
              href={link.href}
              icon={link.icon}
              linkName={link.linkName}
            />
          ))}

          <button
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
            }}
            onMouseEnter={() => {
              setisSearchHovered(true);
            }}
            onMouseLeave={() => setisSearchHovered(false)}
            className="outline-none focus:outline-none group"
            style={{
              backgroundColor:
                pathname.split("/")[1] === "search" ? "#dc2626" : "",
              borderRadius: "50px",
            }}
          >
            <div className="relative group p-2 w-fit">
              <Search color="white" className=" size-6" />
              <h1
                className={` absolute  bottom-0 transform -translate-x-1/2 left-1/2 text-nowrap 
                ${
                  isSearchHovered
                    ? "-translate-y-14 text-black scale-100 bg-white"
                    : "scale-0 text-transparent"
                }
                  delay-200  transition-all   px-2  rounded-md`}
              >
                Search
              </h1>
            </div>
          </button>
        </div>
      </nav>
      <SearchInput />
    </>
  );
}
