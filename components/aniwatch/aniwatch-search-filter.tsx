"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnimeSearchFilter({search}:{search:string}) {
  const types: string[] = [
    "all",
    "ona",
    "special",
    "movie",
    "tv",
    "ova",
    "music",
  ];
  const sortOptions = [
    "default",
    "recently-added",
    "name-az",
    "most-watched",
    "score",
    "released-date",
    "recently-updated",
  ];
  const statusOptions = [
    "finished-airing",
    "currently-airing",
    "not-yet-aired",
    "all",
  ];


  const [type, setType] = useState('');
  const [sort, setSort] = useState('');
  const [status, setStatus] = useState('');
  const [lang, setLang] = useState('');
  

  return (
    <div className="p-4 sticky top-4 rounded h-fit pb-4 flex-col flex bg-black/30 w-full md:w-[300px]">
      <h1 className="text-3xl font-semibold">Search</h1>

      <label className="mt-4" htmlFor="lang">
        Sub/Dub
      </label>
      <select
        onChange={(e) => {
          setLang(e.target.value);
        }}
        id="lang"
        className="bg-black/50 p-2 rounded-sm capitalize"
      >
        <option value="sub-&-dub">Sub & Dub</option>
        <option value="dub">Dub</option>
        <option value="sub">Sub</option>
      </select>

      <label className="mt-4" htmlFor="types">
        Type
      </label>
      <select
        onChange={(e) => {
          setType(e.target.value);
        }}
        id="types"
        className="bg-black/50 p-2 rounded-sm capitalize"
      >
        {types.map((type, i) => (
          <option value={type} key={type + i} className="capitalize">
            {type}
          </option>
        ))}
      </select>

      {/* <label className="mt-4" htmlFor="sort">
        Sort options
      </label>
      <select
        onChange={(e) => {
          setSort(e.target.value);
        }}
        id="sort"
        className="bg-black/50 p-2 rounded-sm capitalize"
      >
        {sortOptions.map((options, i) => (
          <option value={options} key={options + i} className="capitalize">
            {options}
          </option>
        ))}
      </select>

      <label className="mt-4" htmlFor="status">
        Status
      </label>
      <select
        onChange={(e) => {
          setStatus(e.target.value);
        }}
        id="status"
        className="bg-black/50 p-2 rounded-sm capitalize"
      >
        {statusOptions.map((option, i) => (
          <option value={option} key={option + i} className="capitalize">
            {option}
          </option>
        ))}
      </select> */}
      <Link href={
        `/search/anime/${search}${type ? `?type=${type}`:""}${lang ? `&lang=${lang}`:""}${sort ? `&sort=${sort}`:""}${status ? `&status=${status}`:""}`
      }>Filter</Link >
    </div>
  );
}
