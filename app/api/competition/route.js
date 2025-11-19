import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

// ✅ تثبيت اسم الـ collection
const CompetitionSchema = new mongoose.Schema(
  {
    customerName: String,
    customerCode: String,
    invoiceNumber: String,
    phone: String,
    instagram: String,
    branch: String,
    source: String,
  },
  {
    timestamps: true,
    collection: "competition", // 🔒 اسم ثابت للجدول في كل البيئات
  }
);

// ✅ استخدام الموديل الموجود إن وجد
const Competition =
  mongoose.models.Competition ||
  mongoose.model("Competition", CompetitionSchema);

// ✅ دالة الحفظ
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const doc = new Competition(data);
    await doc.save();
    return NextResponse.json({ success: true, message: "Saved successfully" });
  } catch (err) {
    console.error("❌ Error saving competition:", err);
    return NextResponse.json(
      { success: false, message: "Failed to save", error: err.message },
      { status: 500 }
    );
  }
}

// ✅ دالة جلب البيانات (اختياري إذا تريد تعرضها)
export async function GET() {
  try {
    await connectDB();
    const list = await Competition.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: list });
  } catch (err) {
    console.error("❌ Error fetching competition:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch", error: err.message },
      { status: 500 }
    );
  }
}