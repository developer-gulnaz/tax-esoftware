import { NextRequest, NextResponse } from "next/server";
import dbConnect from "lib/db";
import GovtScheme from "models/GovtScheme";
import { ObjectId } from "mongodb";

// ✅ CREATE
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const saved = await GovtScheme.create(body);
    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// ✅ READ (all + pagination + getById)
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const scheme = await GovtScheme.findById(id);
      if (!scheme) return NextResponse.json({ message: "Not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: scheme });
    }

    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const total = await GovtScheme.countDocuments();
    const schemes = await GovtScheme.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({ success: true, data: schemes, total });
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
    const updated = await GovtScheme.findByIdAndUpdate(
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

    await GovtScheme.findByIdAndDelete(new ObjectId(id));
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
