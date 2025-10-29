import { NextRequest, NextResponse } from "next/server";
import dbConnect from "lib/db";
import BuildingTax from "models/BuildingTax";
import { ObjectId } from "mongodb";

// ✅ CREATE NEW BUILDING TAX
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    const saved = await BuildingTax.create(data);
    return NextResponse.json({ message: "✅ Added Successfully", data: saved });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// ✅ GET ALL or GET BY ID (Handles Both)
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const id = req.nextUrl.searchParams.get("id");

    if (id) {
      // ✅ GET BY ID
      const data = await BuildingTax.findById(id);
      if (!data) return NextResponse.json({ message: "Not found" }, { status: 404 });
      return NextResponse.json({ success: true, data });
    }

    // ✅ Pagination support
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const total = await BuildingTax.countDocuments({});
    const taxes = await BuildingTax.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ success: true, data: taxes, total });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// ✅ UPDATE BUILDING TAX
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ message: "ID missing" }, { status: 400 });

    const body = await req.json();

    const updated = await BuildingTax.findByIdAndUpdate(
      new ObjectId(id),
      { $set: body },
      { new: true }
    );

    if (!updated)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json({ message: "✅ Updated successfully", data: updated });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// ✅ DELETE BUILDING TAX
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ message: "ID missing" }, { status: 400 });

    const deleted = await BuildingTax.findByIdAndDelete(new ObjectId(id));
    if (!deleted)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json({ message: "✅ Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
