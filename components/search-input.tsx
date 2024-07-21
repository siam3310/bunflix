"use client";
import { Search, CircleX, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchAniwatchSearch, fetchTmdbMultiSearch } from "@/data/fetch-data";
import Link from "next/link";
import useDebounce from "@/hooks/useDebounce";
import { useSearchBarFocus } from "@/context/searchContext";
import { createImageUrl } from "@/utils/create-image-url";

export default function SearchInput() {
  const [term, setTerm] = useState("");
  const [IsEmpty, setIsEmpty] = useState(false);
  const [type, setType] = useState("multi");
  const [result, setResult] = useState<tmdbMultiSearch | null>();
  const [anime, setAnime] = useState<aniwatchSearch | null>();
  const [preSearched, setPreSearched] = useState<
    { type: string; term: string }[]
  >([]);

  const debounceSearch = useDebounce(term);
  const router = useRouter();

  const {
    setIsSearchBarFocused,
    isSearchBarFocused,
    isSearchOpen,
    setIsSearchOpen,
  } = useSearchBarFocus();

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
    setIsSearchOpen(!isSearchOpen);
  };

  const search = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // onClick();
    if (!term) {
      setIsEmpty(true);
    } else {
      clearAndClose();
      setPreSearched([...preSearched, { type: type, term: term }]);
      router.push(`/search/${type}/${term}`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "Slash":
          event.preventDefault();
          setIsSearchOpen(!isSearchOpen);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen]);

  return (
    <div
      style={{
        bottom: "0px",
        left: "0px",
        transform: isSearchOpen ? "translateY(0px)" : "translateY(300px)",
      }}
      className="flex w-full flex-col duration-500 fixed z-50  h-fit transition-all px-2 md:px-4 items-center justify-center"
    >
      <div className=" bg-gray-700 w-full z-50 max-w-[800px] p-4 rounded-t-xl">
        <div className="mb-2 flex items-center justify-between ">
          <div className=" flex-col flex justify-center gap-2">
            <h1 className=" text-start  text-4xl font-semibold">Search</h1>
          </div>
          <button
            onClick={() => clearAndClose()}
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
            onClick={() => {
              setType("multi");
              setResult(null);
            }}
            className=" px-2 py-.5 rounded bg-gray-500 cursor-pointer"
          >
            Movie/TV
          </p>
          <p
            style={{
              backgroundColor: type === "anime" ? "lightgreen" : "",
              color: type === "anime" ? "green" : "",
            }}
            onClick={() => {
              setType("anime");
              setResult(null);
            }}
            className=" px-2 py-.5 rounded bg-gray-500 cursor-pointer"
          >
            Anime
          </p>
        </div>
        <div
          style={{ padding: term.length > 0 ? "8px" : "0px" }}
          className="my-4 max-h-[400px] overflow-y-scroll rounded-md transition-all text-lg w-full bg-gray-500 "
        >
          {term.length > 0 &&
            type === "multi" &&
            result?.results.map((res) => (
              <Link
                key={res.id}
                target="_blank"
                style={{
                  display: res.media_type === "movie" || "tv" ? "flex" : "none",
                }}
                href={`/info/${res.media_type}/${res.id}`}
                className=" w-full "
              >
                <button className="p-2 w-full rounded-sm text-start hover:bg-gray-700/50 transition-all flex items-center gap-3">
                  <img
                    className="h-[80px] rounded-md"
                    src={createImageUrl(
                      res.poster_path || res.image || res.backdrop_path,
                      "w500"
                    )}
                    alt={res.title || res.name}
                  />
                  <span>
                    {highlightSearchText(res.title || res.name, term)}

                    <span className="line-clamp-1 text-sm">
                      {res.overview || res.synopsis}
                    </span>
                    <span className=" text-sm bg-gray-700 rounded-md px-3 py-1">
                      {res.media_type === "tv" ? "TV Show" : "Movie"}
                    </span>
                  </span>
                </button>
              </Link>
            ))}

          {term.length > 0 &&
            type === "anime" &&
            anime?.animes.map((res) => (
              <Link
                href={`/anime/${res.id}`}
                target="_blank"
                className=" w-full "
                key={res.id}
              >
                <button className="p-2 w-full rounded-sm text-start hover:bg-gray-700/50 transition-all flex items-center gap-3">
                  <img
                    className="h-[80px] rounded-md"
                    src={res.poster}
                    alt={res.name}
                  />
                  <span>
                    {highlightSearchText(res.name, term)}
                    <span className="line-clamp-1 text-sm">
                      Episodes :{res.episodes.dub}
                    </span>
                    <span className=" text-sm bg-gray-700 rounded-md px-3 py-1">
                      {res.type}
                    </span>
                  </span>
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
            placeholder="Press '/' to open Search anywhere"
            value={term}
            onFocus={() => setIsSearchBarFocused(true)}
            onBlur={() => setIsSearchBarFocused(false)}
            onChange={(e) => {
              setTerm(e.target.value);
              setIsEmpty(false);
            }}
          />
          <button>
            <Search size={20} opacity={0.5} />
          </button>
        </form>

        <div className="flex items-center gap-2 my-2">
          {preSearched.slice(0, 5).map((value, index) => (
            <p
              key={index}
              onClick={() => {
                router.push(`/search/${value.type}/${value.term}`);
              }}
              className="bg-gray-100 text-gray-900 w-fit py-1 px-2 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-300 "
            >
              {value.term}
            </p>
          ))}
        </div>

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
    </div>
  );
}

const highlightSearchText = (text: string, highlight: string) => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <span>
      {parts.map((part, index) => {
        return part.toLowerCase() === highlight.toLowerCase() ? (
          <b key={index} className="bg-red-500/70">
            {part}
          </b>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
};
