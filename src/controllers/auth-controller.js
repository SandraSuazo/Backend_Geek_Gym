import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Auth } from "../models/auth-model.js";
import { CONFIG } from "../core/config.js";
import { validateEmail, validatePassword } from "../shared/validators.js";

export const register = async (newUser, next) => {
  const requiredFields = ["name", "email", "password"];
  if (requiredFields.some((field) => !newUser[field])) {
    throw new Error(next("MISSING_REQUIRED_FIELDS"));
  }

  const existingUser = await Auth.findOne({ email: newUser.email });
  if (existingUser) {
    throw new Error(next("USER_ALREADY_EXISTS"));
  }

  validateEmail(newUser.email, next);
  validatePassword(newUser.password, next);

  newUser.password = await bcrypt.hash(newUser.password, CONFIG.HASH_ROUNDS);
  newUser.role = "customer";
  newUser.isActive = true;

  await Auth.create(newUser);
  return newUser;
};

export const login = async ({ email, password }, next) => {
  if (!email || !password) {
    throw new Error(next("INCOMPLETE_CREDENTIALS"));
  }

  const authUser = await Auth.findOne({ email }).select("+password");
  if (!authUser || !(await bcrypt.compare(password, authUser.password))) {
    throw new Error(next("INCORRECT_EMAIL_PASSWORD"));
  }

  if (!authUser.isActive) {
    throw new Error(next("DISABLED_USER"));
  }

  const token = jwt.sign(
    { userId: authUser._id, role: authUser.role, isActive: authUser.isActive },
    CONFIG.SECRET,
    { expiresIn: "24h" }
  );

  return { token };
};
