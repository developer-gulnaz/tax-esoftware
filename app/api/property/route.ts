export const dynamic = "force-dynamic"; // 👈 Keep this

import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const uri = process.env.MONGO_URI as string; // ensure it's in .env.local
const client = new MongoClient(uri);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page: number = parseInt(searchParams.get("page") || "1", 10);
    const limit: number = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    await client.connect();
    const db = client.db("grampanchayat");
    const collection = db.collection("properties");

    const total: number = await collection.countDocuments();
    const data = await collection.find().skip(skip).limit(limit).toArray();

    return NextResponse.json({
      success: true,
      total,
      page,
      limit,
      data,
    });
  } catch (error) {
    console.error("Error fetching milkit data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch data" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
