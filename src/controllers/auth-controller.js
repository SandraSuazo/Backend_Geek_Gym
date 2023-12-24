import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Auth } from "../models/auth-model.js";
import { CONFIG } from "../core/config.js";
import { validateEmail, validatePassword } from "../shared/validators.js";

export const register = async (newUser, next) => {
  const registrationFields = ["name", "email", "password"];
  const missingFields = registrationFields.filter((field) => !newUser[field]);
  if (missingFields.length > 0) {
    throw new Error(next("MISSING_REQUIRED_FIELDS"));
  }

  const user = await Auth.findOne({ email: newUser.email });
  if (user) {
    throw new Error(next("USER_ALREADY_EXISTS"));
  } else {
    validateEmail(newUser.email, next);
    validatePassword(newUser.password, next);

    newUser.password = await bcrypt.hash(newUser.password, CONFIG.HASH_ROUNDS);
    newUser.role = "customer";
    newUser.isActive = true;
  }
  await Auth.create(newUser);
  return newUser;
};

export const login = async ({ email, password }, next) => {
  if (!email || !password) {
    throw new Error(next("INCOMPLETE_CREDENTIALS"));
  }

  const user = await Auth.findOne({ email }).select("+password");
  if (!user) {
    throw new Error(next("INCORRECT_EMAIL_PASSWORD"));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error(next("INCORRECT_EMAIL_PASSWORD"));
  }

  if (user.isActive === false) {
    throw new Error(next("DISABLED_USER"));
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      isActive: user.isActive,
    },
    CONFIG.SECRET,
    {
      expiresIn: "24h",
    }
  );
  return { token };
};
