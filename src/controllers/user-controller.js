import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";
import { CONFIG } from "../core/config.js";
import { validateEmail, validatePassword } from "../shared/validators.js";

export const registerUser = async (newUser, next) => {
  // const missingFields = registrationFields.filter((field) => !newUser[field]);
  // if (missingFields.length > 0) {
  //   throw new Error(next("MISSING_REQUIRED_FIELDS"));
  // }
  try {
    const user = await User.findOne({ email: newUser.email });
    if (user) {
      throw new Error(next("USER_ALREADY_EXISTS"));
    } else {
      validateEmail(newUser.email, next);
      validatePassword(newUser.password, next);
      newUser.password = await bcrypt.hash(
        newUser.password,
        CONFIG.HASH_ROUNDS
      );
      newUser.role = "customer";
      newUser.isActive = true;
    }
    await User.create(newUser);
    return newUser;
  } catch (error) {
    next(error);
  }
};
