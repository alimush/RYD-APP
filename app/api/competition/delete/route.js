import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

// ✅ تعريف الـ Schema
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
  { timestamps: true }
);

// ✅ تثبيت اسم الجدول "competition"
const Competition =
  mongoose.models.Competition ||
  mongoose.model("Competition", CompetitionSchema, "competition");

// ✅ دالة الحذف الجماعي
export async function DELETE() {
  try {
    await connectDB();

    const result = await Competition.deleteMany({});
    return NextResponse.json({
      success: true,
      message: `Deleted ${result.deletedCount} documents successfully.`,
    });
  } catch (err) {
    console.error("❌ Error deleting all documents:", err);
    return NextResponse.json(
      { success: false, message: "Failed to delete all", error: err.message },
      { status: 500 }
    );
  }
}