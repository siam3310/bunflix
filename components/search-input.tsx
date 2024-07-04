"use client";
import { Search, X, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchAniwatchSearch, fetchTmdbMultiSearch } from "@/data/fetch-data";
import Link from "next/link";
import useDebounce from "@/hooks/useDebounce";

export default function SearchInput({ onClick }: { onClick: () => void }) {
  const [term, setTerm] = useState("");
  const [IsEmpty, setIsEmpty] = useState(false);
  const [type, setType] = useState("multi");
  const [result, setResult] = useState<tmdbMultiSearch | null>();
  const [anime, setAnime] = useState<aniwatchSearch | null>();
  const debounceSearch = useDebounce(term);
  const router = useRouter();

  const search = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    clearAndClose();
    onClick();
    if (!term) {
      setIsEmpty(true);
    } else {
      router.push(`/search/${type}/${term}`);
    }
  };

  useEffect(() => {
    if (!term) {
      setTerm("");
      return;
    } else if (type === "multi") {
      fetchTmdbMultiSearch(debounceSearch, 1).then((res: tmdbMultiSearch) => {
        setResult(res);
      });
    } else if (type === "anime") {
      fetchAniwatchSearch(debounceSearch).then((res: aniwatchSearch) => {
        setAnime(res);
      });
    }
  }, [debounceSearch]);

  const clearAndClose = () => {
    setResult(null);
    setAnime(null);
    setTerm("");
    onClick();
  };

  const highlightSearchText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index} className="bg-red-500/70">{part}</b>
          ) : (
            <span key={index}>{part}</span>
          );
        })}
      </span>
    );
  };

  return (
    <div className="flex mx-4 pt-4 flex-col  h-full">
      <div className="mb-2 flex items-center justify-between">
        <div className=" flex-col flex justify-center gap-2">
          <h1 className=" text-start  text-4xl font-semibold">Search</h1>
        </div>
        <button
          onClick={clearAndClose}
          className=" transition-all  hover:bg-red-600 items-center rounded-full p-2 size-10 aspect-square"
        >
          <X />
        </button>
      </div>
      <div className=" flex items-center gap-2 ">
        <p
          style={{
            backgroundColor: type === "multi" ? "lightgreen" : "",
            color: type === "multi" ? "green" : "",
          }}
          onClick={() => setType("multi")}
          className=" px-2 py-.5 rounded bg-gray-500 cursor-pointer"
        >
          Movie/TV
        </p>
        <p
          style={{
            backgroundColor: type === "anime" ? "lightgreen" : "",
            color: type === "anime" ? "green" : "",
          }}
          onClick={() => setType("anime")}
          className=" px-2 py-.5 rounded bg-gray-500 cursor-pointer"
        >
          Anime
        </p>
      </div>
      <div
        style={{ padding: term.length > 0 ? "8px" : "0px" }}
        className="my-4 rounded-md transition-all text-lg w-full bg-gray-500 "
      >
        {term.length > 0 &&
          type === "multi" &&
          result?.results.slice(0, 3).map((res) => (
            <Link
              key={res.id}
              target="_blank"
              style={{ display: res.media_type === "person" ? "none" : "flex" }}
              href={`/info/${res.media_type}/${res.id}`}
              className=" w-full "
            >
              <button className="p-2 w-full rounded-sm text-start hover:bg-gray-700">
                {highlightSearchText(res.title || res.name,term)}

                <span className="line-clamp-1 text-sm">{res.overview || res.synopsis}</span>
                <span className=" text-sm bg-gray-700 rounded-md px-3 py-1">{res.media_type === "tv" ? "TV Show":"Movie"}</span>
              </button>
            </Link>
          ))}

        {term.length > 0 &&
          type === "anime" &&
          anime?.animes.slice(0, 3).map((res) => (
            <Link href={`/anime/${res.id}`} target="_blank" className=" w-full " key={res.id}>
              <button className="p-2 w-full rounded-sm text-start hover:bg-gray-700">
                {highlightSearchText(res.name,term)}
                <span className="line-clamp-1 text-sm">Episodes :{res.episodes.dub}</span>
                <span className=" text-sm bg-gray-700 rounded-md px-3 py-1">{res.type}</span>
              </button>
            </Link>
          ))}
      </div>
      <form
        onSubmit={search}
        className="flex flex-row-reverse rounded-md overflow-hidden px-2 w-full bg-gray-600 h-[40px]"
      >
        <input
          type="text"
          className=" w-full placeholder:text-white/50 focus:outline-none bg-transparent  h-full px-2 "
          placeholder="Search..."
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            setIsEmpty(false);
          }}
        />
        <button>
          <Search size={20} opacity={0.5} />
        </button>
      </form>
      <motion.p
        initial={{ y: 100 }}
        onClick={() => setIsEmpty(false)}
        animate={{ y: IsEmpty ? 0 : 100 }}
        className="mt-2 text-red-500 text-md bg-red-100 py-1 rounded-md px-2 font-medium w-fit flex items-center justify-between cursor-pointer"
      >
        <CircleX className=" mr-2 cursor-pointer " size={20} />
        Empty Search are Not Allowed !
      </motion.p>
    </div>
  );
}
