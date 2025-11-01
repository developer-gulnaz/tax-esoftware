import bcrypt from "bcryptjs";
import dbConnect from "lib/db";
import Admin from "models/Admin";
import SessionModel from "models/Session";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // ✅ ensure MongoDB connection

    const { username, gpCode, financialYear, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Missing username or password" },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ username: username.trim() });

    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    // ✅ Create secure random session ID
    const sessionId = crypto.randomBytes(32).toString("hex");

    // ✅ Set expiry (e.g., 1 day)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // ✅ Store session in MongoDB
    await SessionModel.create({
      sessionId,
      userId: admin._id,
      username: admin.username,
      role: admin.role,
      expiresAt,
      revoked: false,
      ip: req.headers.get("x-forwarded-for") || req.ip || "unknown",
      userAgent: req.headers.get("user-agent") || "unknown",
      data: { gpCode, financialYear },
    });

    // ✅ Set HTTP-only secure cookie
    const response = NextResponse.json({
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

    response.cookies.set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login Error:", error.message);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
