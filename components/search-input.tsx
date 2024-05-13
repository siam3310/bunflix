"use client";
import { Search, X, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SearchInput({ onClick }: { onClick: () => void }) {
  const [term, setTerm] = useState("");
  const [IsEmpty, setIsEmpty] = useState(false);
  const [type, setType] = useState("multi");
  const router = useRouter();

  const search = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!term ) {
      setIsEmpty(true);
    } else {
      router.push(`/search/${type}/${term}/1`);
    }
  };

  return (
    <div className="flex mx-4 pt-4 flex-col  h-full">
      <div className="mb-2 flex items-center justify-between">
         <div className=" flex-col flex justify-center gap-2" >
         <h1 className=" text-start  text-4xl font-semibold">Search</h1>
          
         </div>
        <button
          onClick={onClick}
          className=" transition-all  hover:bg-red-600 items-center rounded-full p-2 size-10 aspect-square"
        >
          <X />
        </button>
      </div>
      <div className=" flex items-center gap-2 mb-4">
          
          <p
            style={{
              backgroundColor: type === "multi" ? "lightgreen" : "",
              color: type === "multi" ? "green" : "",
            }}
            onClick={() => setType("multi")}
            className=" px-2 py-.5 rounded bg-gray-500 cursor-pointer"
          >
            Movie/TV/Actor
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
