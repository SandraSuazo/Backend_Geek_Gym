import express from "express";
import { auth } from "../middlewares/auth.js";
import { isActive } from "../middlewares/isActive.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  profileUser,
  updateProfile,
  deactivateUser,
} from "../controllers/user-controller.js";

const router = express.Router();

router.get("/profile", auth, isActive, async (req, res, next) => {
  const userId = req.user.userId;
  try {
    res.json(await profileUser(userId, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

router.patch("/update-profile", auth, isActive, async (req, res, next) => {
  const userId = req.user.userId;
  const updatedData = req.body;
  try {
    res.json(await updateProfile(userId, updatedData, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

router.delete(
  "/deactivate/:userId",
  auth,
  isActive,
  isAdmin,
  async (req, res, next) => {
    const userId = req.params.userId;
    try {
      res.json(await deactivateUser(userId, next));
    } catch (error) {
      next("INTERNAL_SERVER_ERROR");
    }
  }
);

export default router;
