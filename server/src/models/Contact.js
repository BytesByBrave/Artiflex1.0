import mongoose from "mongoose";

export default mongoose.model(
  "Contact",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      message: { type: String, required: true },
    },
    { timestamps: true }
  )
);
