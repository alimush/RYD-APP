import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

const USERS_COL = "users";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

const User =
  mongoose.models.User || mongoose.model("User", userSchema, USERS_COL);

export async function POST(req) {
  try {
    await connectDB();

    const { username, password } = await req.json();
    const user = await User.findOne({ username, password }).lean();

    if (!user) {
      return NextResponse.json(
        { error: "❌ Wrong username or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "✅ Login successful",
      user: { username: user.username, role: user.role },
    });
  } catch (error) {
    console.error("❌ Error logging in:", error);
    return NextResponse.json(
      { error: "❌ Server error", details: error.message },
      { status: 500 }
    );
  }
}