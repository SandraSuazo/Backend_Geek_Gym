import mongoose, { Schema } from "mongoose";

const nutritionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["balanceDiet", "proteinDiet", "ketogenicDiet"],
      required: true,
    },
    description: { type: String, required: true },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Nutrition = mongoose.model("Nutrition", nutritionSchema);
