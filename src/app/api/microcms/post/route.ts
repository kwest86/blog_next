import { client } from "@/libs/client";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id) {
    return new NextResponse(JSON.stringify({ error: "id is required" }), {
      status: 400,
    });
  }
  const draftKey = searchParams.get("draftKey");
  const requestOptions: {
    endpoint: string;
    contentId: string;
    queries?: { draftKey?: string };
  } = {
    endpoint: "blog",
    contentId: id,
  };
  if (draftKey) {
    requestOptions.queries = { draftKey: draftKey };
  }

  try {
    const res = await client.get(requestOptions);
    return new NextResponse(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
