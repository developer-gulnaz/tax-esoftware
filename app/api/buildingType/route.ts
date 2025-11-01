import { NextRequest, NextResponse } from "next/server";
import dbConnect from "lib/db";
import BuildingType from "models/BuildingType";
import { ObjectId } from "mongodb";

// ✅ CREATE
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const saved = await BuildingType.create(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// ✅ READ — all, pagination, getById, nextCode
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const searchParams = req.nextUrl.searchParams;

    // ✅ Get next code for form
    if (searchParams.get("nextCode") === "true") {
      const lastItem = await BuildingType.findOne().sort({ code: -1 });
      const nextCode = lastItem ? Number(lastItem.code) + 1 : 1;
      return NextResponse.json({ success: true, nextCode });
    }

    // ✅ Get record by ID
    const id = searchParams.get("id");
    if (id) {
      const item = await BuildingType.findById(id);
      if (!item)
        return NextResponse.json({ message: "Not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: item });
    }

    // ✅ List with pagination
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const total = await BuildingType.countDocuments();
    const list = await BuildingType.find()
      .sort({ code: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ success: true, data: list, total });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


// ✅ UPDATE
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ message: "ID missing" }, { status: 400 });

    const body = await req.json();
    const updated = await BuildingType.findByIdAndUpdate(
      new ObjectId(id),
      { $set: body },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// ✅ DELETE
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ message: "ID missing" }, { status: 400 });

    await BuildingType.findByIdAndDelete(new ObjectId(id));
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
