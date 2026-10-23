import mongoose from "mongoose";

export default async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/dorio";
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log("MongoDB connected successfully");
    return true;
  } catch (err) {
    console.warn("MongoDB offline (running in resilient in-memory fallback mode):", err.message);
    return false;
  }
}
