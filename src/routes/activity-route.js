import express from "express";
import { auth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { createActivity } from "../controllers/activity-controller.js";

const router = express.Router();

router.post("/", auth, isAdmin, async (req, res, next) => {
  try {
    res.json(await createActivity(req.body, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

export default router;
