import connectDB from "lib/db";
import Property from "models/Property";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const property = new Property(body);
    await property.save();

    return NextResponse.json({ success: true, data: property }, { status: 201 });
  } catch (error: any) {
    console.error("Error saving property:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const properties = await Property.find().populate("selectedTaxes").populate("selectedAkarani");
    return NextResponse.json({ success: true, data: properties });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
