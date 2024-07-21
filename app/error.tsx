"use client";

import { RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  return (
    <div className="flex flex-col h-full items-center justify-center bg-black/80">
      <h2 className=" text-3xl font-bold ">Something went wrong!</h2>
      <p>Error : {error.message}</p>
      <button
        onClick={() => reset()}
        className=" mt-2 w-fit px-2 rounded-lg py-1 bg-white/80 hover:bg-white/90 flex items-center justify-center gap-2 transition-all  text-black font-semibold"
      >
        Try Again <RefreshCcw size={15} />
      </button>
    </div>
  );
}
