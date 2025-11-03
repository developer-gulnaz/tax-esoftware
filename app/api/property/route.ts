import connectDB from "lib/db";
import TaxDetails from "models/TaxDetails"; // ✅ Ensure it's imported
import Property from "models/Property";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // 🩹 Fix: If image is not a string, remove it
    if (body.image && typeof body.image !== "string") {
      delete body.image;
    }

    // Validate required fields
    if (!body.ownerName || !body.mobile || !body.propertyNumber) {
      return NextResponse.json(
        { success: false, error: "Required fields missing" },
        { status: 400 }
      );
    }

    // Create new Property
    const newProperty = await Property.create(body);

    return NextResponse.json({
      success: true,
      message: "Property added successfully",
      data: newProperty,
    });
  } catch (error: any) {
    console.error("Error adding property:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


// ✅ READ (Get All + GetById + Pagination)
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const id = req.nextUrl.searchParams.get("id");
    const page = Number(req.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    if (id) {
      // Populate selectedTaxes with full tax details
      const property = await Property.findById(id)
        .populate("selectedTaxes", "taxName amount amountType") // <-- key line
        .lean();

      if (!property)
        return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

      return NextResponse.json({ success: true, data: property });
    }

    const total = await Property.countDocuments();
    const properties = await Property.find()
      .populate("selectedTaxes", "taxName amount amountType") // <-- populate for list as well
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, data: properties, total, page, limit });
  } catch (error: any) {
    console.error("❌ Error fetching properties:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


// ✅ DELETE (By Id)
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const id = req.nextUrl.searchParams.get("id");
    if (!id)
      return NextResponse.json({ success: false, message: "Missing id" }, { status: 400 });

    await Property.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Property deleted" });
  } catch (error: any) {
    console.error("Error deleting property:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
