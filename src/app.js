import express from "express";
import cors from "cors";
import { CONFIG } from "./core/config.js";
import authRouter from "./routes/auth-route.js";
import userRouter from "./routes/user-route.js";
// import activityRouter from "./ruotes/activity-route.js"

import { connectDB } from "./core/db.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", authRouter);
app.use("/user", userRouter);
// app.use("/activity", activityRouter);

app.listen(CONFIG.PORT, () =>
  console.log(`Server listening on port ${CONFIG.PORT}`)
);

connectDB();
