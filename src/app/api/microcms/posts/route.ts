import { client } from "@/libs/client";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("tag");
  const queries = query ? { filters: `tags[contains]${query}` } : {};
  try {
    const res = await client.get({ endpoint: "blog", queries });
    return new NextResponse(JSON.stringify(res.contents), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
