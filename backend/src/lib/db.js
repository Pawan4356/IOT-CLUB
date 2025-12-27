import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const connectDB = mongoose.connect(ENV.DB_URL);
    console.log("✅ DB Connected!");
  } catch (error) {
    console.error("❌ Error connecting DB: ", error);
    process.exit(1);
  }
}