export const dynamic = "force-dynamic"; // 👈 Add this line

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGO_URI; // ensure it's in .env.local
const client = new MongoClient(uri);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    await client.connect();
    const db = client.db("gram-panchayat"); // replace with your DB name
    const collection = db.collection("properties");

    const total = await collection.countDocuments();
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
