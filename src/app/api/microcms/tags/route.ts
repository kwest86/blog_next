import { client } from "@/libs/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await client.get({ endpoint: "tags" });
    return new NextResponse(JSON.stringify(res.contents), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
