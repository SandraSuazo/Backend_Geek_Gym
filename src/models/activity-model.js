import mongoose, { Schema } from "mongoose";

const activitySchema = new Schema(
  {
    type: {
      type: String,
      enum: ["yoga", "zumba", "spinning", "bodyCombat"],
      required: true,
    },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    customers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    monitor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const Activity = mongoose.model("Activity", activitySchema);