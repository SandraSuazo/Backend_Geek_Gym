import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, ref: "Auth", required: true },
    phone: { type: Number, unique: true, minlength: 9 },
    adress: { type: String, maxlength: 200 },
    weight: { type: Number },
    height: { type: Number },
    gender: {
      type: String,
      enum: ["female", "male", "other"],
    },
    nutrition: {
      type: String,
      enum: ["balanceDiet", "proteinDiet", "ketogenicDiet"],
    },
    subscription: { type: Number },
  },
  { versionKey: false, timestamps: true }
);

export const User = mongoose.model("User", userSchema);
