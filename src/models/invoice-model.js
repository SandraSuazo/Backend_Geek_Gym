import mongoose, { Schema } from "mongoose";

const invoiceSchema = new Schema(
  {
    date: { type: Date, required: true },
    price: { type: Number, require: true },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    activities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activity",
        required: true,
      },
    ],
    isPaid: { type: Boolean, required: true },
  },
  { versionKey: false, timestamps: true }
);

export const Invoice = mongoose.model("Invoice", invoiceSchema);
