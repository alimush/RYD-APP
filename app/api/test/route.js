import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb("test");
    const collections = await db.listCollections().toArray();

    return NextResponse.json({
      message: "✅ Connected to MongoDB successfully",
      collections: collections.map((c) => c.name),
    });
  } catch (error) {
    console.error("Connection error:", error);
    return NextResponse.json(
      { message: "❌ Failed to connect to MongoDB", error: error.message },
      { status: 500 }
    );
  }
}