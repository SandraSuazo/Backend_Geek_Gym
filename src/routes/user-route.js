import express from "express";
import { auth } from "../middlewares/auth.js";
import { isActive } from "../middlewares/isActive.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
  profileUser,
  updateProfile,
  getAllUsers,
  deactivateUser,
  activateUser,
} from "../controllers/user-controller.js";

const router = express.Router();

router.get("/profile", auth, isActive, async (req, res, next) => {
  try {
    res.json(await profileUser(req.user.userId, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

router.patch("/update-profile", auth, isActive, async (req, res, next) => {
  try {
    res.json(await updateProfile(req.user.userId, req.body, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

router.get("/all-users", auth, isAdmin, async (req, res, next) => {
  try {
    res.json(await getAllUsers(next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

router.get("/details/:userId", auth, isAdmin, async (req, res, next) => {
  try {
    res.json(await getUserDetails(req.params.userId, next));
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
    try {
      res.json(await deactivateUser(req.params.userId, next));
    } catch (error) {
      next("INTERNAL_SERVER_ERROR");
    }
  }
);

router.patch("/activate/:userId", auth, isAdmin, async (req, res, next) => {
  try {
    res.json(await activateUser(req.params.userId, next));
  } catch (error) {
    next("INTERNAL_SERVER_ERROR");
  }
});

export default router;
