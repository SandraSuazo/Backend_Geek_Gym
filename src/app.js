import express from "express";
import cors from "cors";
import { CONFIG } from "./core/config.js";
import { connectDB } from "./core/db.js";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(CONFIG.PORT, () =>
  console.log(`Server listening on port ${CONFIG.PORT}`)
);

connectDB();
