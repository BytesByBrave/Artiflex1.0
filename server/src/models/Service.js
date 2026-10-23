import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    tags: [String],
    image: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
