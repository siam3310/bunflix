import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: 'Categories - Nextflix',
  description: 'Nextflix clone built with Next.js and Tailwind CSS',
}
export default function Category() {

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
      name: "Netflix",
      link: "/categories/netflix/tv/1",
      img: "https://image.tmdb.org/t/p/w500//cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
    },
    {
      id: 8,
      name: "Amazon Prime",
      link: "/categories/amazon/tv/1",
      img: "https://image.tmdb.org/t/p/w500//7Ns6tO3aYjppI5bFhyYZurOYGBT.jpg",
    },
    {
      id: 9,
      name: "Disney Plus",
      link: "/categories/disney%20Plus/tv/1",
      img: "https://image.tmdb.org/t/p/w500//vKDUmKO6F9bSKKyHhg7YGbgcEeF.jpg",
    },
    {
      id: 10,
      name: "Hulu",
      link: "/categories/hulu/tv/1",
      img: "https://image.tmdb.org/t/p/w500//7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg",
    },
    {
      id: 11,
      name: "Apple TV",
      link: "/categories/apple%20Tv/tv/1",
      img: "https://image.tmdb.org/t/p/w500//uwrQHMnXD2DA1rvaMZk4pavZ3CY.jpg",
    },
    {
      id: 12,
      name: "HBO",
      link: "/categories/hbo/tv/1",
      img: "https://image.tmdb.org/t/p/w500//rTc7ZXdroqjkKivFPvCPX0Ru7uw.jpg",
    },
    {
      id: 13,
      name: "Paramount Plus",
      link: "/categories/paramount%20Plus/tv/1",
      img: "https://image.tmdb.org/t/p/w500//hmHA5jqxN3ESIAGx0jAwV7TJhTQ.jpg",
    },
    {
      id: 14,
      name: "Peacock",
      link: "/categories/peacock/tv/1",
      img: "https://image.tmdb.org/t/p/w500//cPn71YFDENH0JkWUezlsLyWmLfN.jpg",
    },
    {
      id: 15,
      name: "Top Rated TV Shows",
      link: "/categories/top%20Rated%20Tv%20Shows/tv/1",
      img: "https://image.tmdb.org/t/p/w500//ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    },
    {
      id: 16,
      name: "Anime TV Shows",
      link: "/categories/anime/tv/1",
      img: "https://image.tmdb.org/t/p/w500//geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg",
    },
  ];
  return (
    <>
      <div className="w-full">
        <h1 className="text-2xl font-bold lg:text-5xl p-4">Browse Categories</h1>
        <div className="grid gap-4 mx-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((e) => (
            <div key={e.id}>
            <Link className=" group"  href={e.link}>
              <div className=" w-full h-[350px] rounded-xl overflow-hidden ">
                <div className="relative h-full w-full">
                    <div className=" h-full w-full absolute duration-200 group-hover:from-black/20 group-hover:to-black/50  transition-all bg-gradient-to-br from-black/50 to-black/90 pl-6 z-10 " />
                    <img className="h-full w-full object-cover" src={e.img} alt={e.name} />
                    <button className=" opacity-80 group-hover:opacity-100  text-4xl text-center font-semibold absolute top-1/2 z-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">{e.name}</button>
                </div>
              </div>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
