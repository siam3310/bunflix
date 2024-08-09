"use server";

import cache from "@/lib/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");
  const q = searchParams.get("q");
  const page = searchParams.get("page")
  const key = process.env.TMDB_KEY;

  if (type === "multi") {
    const cacheKey = `tmdbMultiSeacrh${q}${page || 1}`;

    try {
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        return Response.json(cachedData);
      }
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${q}&page=${
          page || 1
        }&api_key=${key}`
      );

      const data = await response.json();
      cache.set(cacheKey, data, 60 * 60 * 24);

      return Response.json(data);
    } catch  {
      return Response.json({ Error: "error searching" });
    }
  } else {
    const cacheKey = `aniwatchSearch${q}${page || 1}`;

    try {
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        return Response.json(cachedData);
      }
      const response = await fetch(
        `${process.env.ANIWATCH_API}/anime/search?q=${q}&page=${page || 1}`
      );
      const data = await response.json();
      cache.set(cacheKey, data, 60 * 60 * 24);

      return Response.json(data);
    } catch (error) {
      return Response.json({ Error: "error searching" });
    }
  }
}
