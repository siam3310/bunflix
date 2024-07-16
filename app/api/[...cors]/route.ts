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

  return new Response(await result.arrayBuffer(), {
    status: 200,
  });
}
