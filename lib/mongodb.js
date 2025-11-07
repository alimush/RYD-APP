import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
const DB_NAME = "test"; // 🔹 أضف هذا السطر

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Already connected to MongoDB");
    return mongoose.connection;
  }

  try {
    await mongoose.connect(uri, {
      dbName: DB_NAME, // ✅ هنا المشكلة — لازم تحدد اسم قاعدة البيانات
      tls: true,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true,
    });
    console.log(`✅ Connected to MongoDB database: ${DB_NAME}`);
    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}