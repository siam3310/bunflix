"use server";

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const reqUrl = request.url
    .split("/")
    .splice(4)
    .map((part) => `${part}${part === "https:" ? "//" : "/"}`)
    .join("");

  const result = await fetch(reqUrl, { method: "GET" });

  if (!result.ok) {
    return;
  }

  return new Response(await result.arrayBuffer(),{
    status:200,
    headers:{
      'Access-Control-Allow-Origin': '127.0.0.1:3000, localhost:3000',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type, application/octet-stream',

    }
  });
}
