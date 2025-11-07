import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";

const competitionSchema = new mongoose.Schema({
  customerName: String,
  customerCode: String,
  invoiceNumber: String,
  phone: String,
  instagram: String,
  branch: String,
  source: String,
});

const Competition =
  mongoose.models.Competition ||
  mongoose.model("Competition", competitionSchema, "competition");

export async function GET() {
  try {
    await connectDB();
    const data = await Competition.find({}).lean();
    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Error fetching competition:", err);
    return NextResponse.json(
      { message: "Error fetching data", error: err.message },
      { status: 500 }
    );
  }
}