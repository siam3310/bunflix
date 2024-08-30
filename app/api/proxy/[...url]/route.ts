"use server";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const reqUrl: string[] = req.nextUrl.pathname.split("/").slice(3);
  const completeUrl = reqUrl
    .map((part) => (part === "https:" ? part + "//" : part + "/"))
    .join("");

  const res = await fetch(completeUrl);

  if (!res.ok) {
    return Response.json(
      { Error: "failed to fetch requested url" },
      { status: 404 }
    );
  }

  const data = await res.arrayBuffer();

  return new Response(data, { status: 200 });
}
