import express from "express";
import { register, login } from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    res.json(await register(req.body, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    res.json(await login({ email, password }, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

export default router;
