export const runtime = "edge";

import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return new NextResponse(
      JSON.stringify({ error: "Please provide a URL query parameter." }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const html = await response.text();
    const ogTitle = html.match(/<meta property="og:title" content="(.*?)"\/?>/);
    const ogDescription = html.match(
      /<meta property="og:description" content="(.*?)"\/?>/,
    );
    const ogImage = html.match(/<meta property="og:image" content="(.*?)"\/?>/);
    const favicon =
      html.match(/<link rel="icon" href="(.*?)"\/?>/i)?.[1] ||
      html.match(/<link rel="shortcut icon" href="(.*?)"\/?>/i)?.[1] ||
      "";

    return new NextResponse(
      JSON.stringify({
        ogTitle: ogTitle ? ogTitle[1] : "",
        ogDescription: ogDescription ? ogDescription[1] : "",
        ogImage: ogImage ? ogImage[1] : "",
        favicon: favicon,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
