import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 200 },
    phone: { type: Number, unique: true, minlength: 9 },
    adress: { type: String, minlength: 5 },
    email: { type: String, required: true, unique: true, maxlength: 50 },
    password: { type: String, required: true, select: false, maxlenght: 15 },
    subscription: { type: Number, required: true },
    role: {
      type: String,
      enum: ["admin", "customer", "monitor"],
      required: true,
    },
    isActive: { type: Boolean, required: true },
  },
  { versionKey: false, timestamps: true }
);

export const User = mongoose.model("User", userSchema);
