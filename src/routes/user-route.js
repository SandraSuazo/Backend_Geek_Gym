import express from "express";
import { registerUser } from "../controllers/user-controller.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  const newUser = req.body;
  try {
    res.json(await registerUser(newUser, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

export default router;
