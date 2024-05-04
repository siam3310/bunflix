import Link from "next/link";

export default function Star() {
  return (
    <>
      <div className=" p-4 pb-24">
        <h1 className=" text-3xl font-semibold ">Which One ?</h1>
        <div className=" flex gap-4 mt-12 flex-col">
          <Link href={`/star/movies`}>
            <button className=" hover:underline text-xl hover:bg-white hover:text-black transition-all py-1 px-3 rounded-lg">
              Movies
            </button>
          </Link>
          <Link href={`/star/anime`}>
            <button className=" hover:underline text-xl hover:bg-white hover:text-black transition-all py-1 px-3 rounded-lg">
              Anime
            </button>
          </Link>
          <Link href={`/star/tv`}>
            <button className=" hover:underline text-xl hover:bg-white hover:text-black transition-all py-1 px-3 rounded-lg">
              TV Shows
            </button>
          </Link>
          <Link href={`/star/tv-episode`}>
            <button className=" hover:underline text-xl hover:bg-white hover:text-black transition-all py-1 px-3 rounded-lg">
              TV Episode
            </button>
          </Link>
          <Link href={`/star/anime-episode`}>
            <button className=" hover:underline text-xl hover:bg-white hover:text-black transition-all py-1 px-3 rounded-lg">
              Anime Episode
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
