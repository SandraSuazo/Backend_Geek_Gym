import mongoose, { Schema } from "mongoose";

const authSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 200 },
    email: { type: String, required: true, unique: true, maxlength: 50 },
    password: { type: String, required: true, select: false, maxlenght: 15 },
    role: {
      type: String,
      enum: ["admin", "customer", "monitor"],
      required: true,
    },
    isActive: { type: Boolean, required: true },
  },
  { versionKey: false, timestamps: true }
);

export const Auth = mongoose.model("Auth", authSchema);
