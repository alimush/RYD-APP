import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

const CompetitionSchema = new mongoose.Schema({
  customerName: String,
  customerCode: String,
  invoiceNumber: String,
  phone: String,
  instagram: String,
  branch: String,
  source: String,
});

const Competition =
  mongoose.models.Competition || mongoose.model("Competition", CompetitionSchema);

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const doc = new Competition(data);
    await doc.save();
    return NextResponse.json({ message: "Saved successfully" });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ message: "Failed to save", error: err.message }, { status: 500 });
  }
}