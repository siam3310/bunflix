"use server";

import cache from "@/lib/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

  const reqUrl = request.url
  .split("/")
  .splice(4)
  .map((part) => `${part}${part === "https:" ? "//" : "/"}`)
  .join("");


  const cachedValue:any = cache.get(reqUrl)

  if(cachedValue){
    console.log("returned cached data");
    
    return new Response(cachedValue, {
      status: 200,
    });
  }

  const result = await fetch(reqUrl, { method: "GET" });

  if (!result.ok) {
    return;
  }

  const blobData = result.arrayBuffer()
  cache.set(reqUrl, blobData)

  return new Response(await blobData, {
    status: 200,
  });
}
