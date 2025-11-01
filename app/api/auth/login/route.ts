import bcrypt from "bcryptjs";
import dbConnect from "lib/db";
import Admin from "models/Admin";
import SessionModel from "models/Session";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// ✅ Helper to safely extract client IP
function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // ensure MongoDB is connected

    const { username, gpCode, financialYear, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Missing username or password" },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ username: username.trim() });
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    // ✅ Create secure session
    const sessionId = crypto.randomBytes(32).toString("hex");
    const oneHour = 60 * 60 * 1000;
    const expiresAt = new Date(Date.now() + oneHour);

    const ip = getClientIp(req);
    const userAgent = req.headers.get("user-agent") || "unknown";

    await SessionModel.create({
      sessionId,
      userId: admin._id,
      username: admin.username,
      role: admin.role,
      expiresAt,
      revoked: false,
      ip,
      userAgent,
      data: { gpCode, financialYear },
      active: true,
      lastActiveAt: new Date(),
    });

    // ✅ Set secure session cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful ✅",
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
        gpCode: admin.gpCode,
        gpName: admin.gpName,
        address: admin.address,
        tehsil: admin.tehsil,
        district: admin.district,
        pincode: admin.pincode,
        phone: admin.phone,
        mobile: admin.mobile,
        email: admin.email,
        profileImg: admin.profileImg,
      },
    });

    response.cookies.set("sid", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: oneHour / 1000, // 1 hour
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
