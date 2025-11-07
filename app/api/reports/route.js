import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";

// ✅ تعريف الـ Schema
const competitionSchema = new mongoose.Schema(
  {
    customerName: { type: String, trim: true },
    customerCode: { type: String, trim: true },
    invoiceNumber: { type: String, trim: true },
    phone: { type: String, trim: true },
    instagram: { type: String, trim: true },
    branch: { type: String, trim: true },
    source: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "competition" } // 👈 تأكد أن اسم التجميعة في المونغو هو "competition"
);

// ✅ تعريف الموديل (لتجنب إعادة تعريفه)
const Competition =
  mongoose.models.Competition ||
  mongoose.model("Competition", competitionSchema);

// ✅ GET – جلب كل بيانات التقرير
export async function GET() {
  try {
    await connectDB();
    const data = await Competition.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { success: true, count: data.length, data },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error fetching competition data:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ DELETE – حذف كل البيانات (اختياري)
export async function DELETE() {
  try {
    await connectDB();
    const result = await Competition.deleteMany({});
    return NextResponse.json({
      success: true,
      deleted: result.deletedCount,
      message: "✅ All competition records deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting competition data:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting data", error: error.message },
      { status: 500 }
    );
  }
}