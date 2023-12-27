import bcrypt from "bcrypt";
import { Auth } from "../models/auth-model.js";
import { User } from "../models/user-model.js";
import { CONFIG } from "../core/config.js";
import { validateEmail, validatePassword } from "../shared/validators.js";

export const profileUser = async (userId, next) => {
  const authUser = await Auth.findById(userId);
  const user = await User.findById(userId);
  if (!authUser && !user) {
    throw new Error(next("USER_NOT_FOUND"));
  }
  return { authUser, user };
};

export const updateProfile = async (userId, updatedData, next) => {
  if (updatedData.email !== "") {
    validateEmail(updatedData.email, next);
  }

  // if (updatedData.password !== "") {
  //   validatePassword(updatedData.password, next);
  //   updatedData.password = await bcrypt.hash(
  //     updatedData.password,
  //     CONFIG.HASH_ROUNDS
  //   );
  // }

  const authUser = await Auth.findByIdAndUpdate(userId, updatedData);
  if (!authUser) {
    throw new Error(next("USER_NOT_FOUND"));
  }

  let user = await User.findByIdAndUpdate(userId, updatedData);
  if (!user) {
    await User.create({
      _id: userId,
      ...updatedData,
    });
  }
  return { authUser, user };
};

export const deactivateUser = async (userId, next) => {
  const authUser = await Auth.findByIdAndUpdate(userId, { isActive: false });
  if (!authUser) {
    throw new Error(next("USER_NOT_FOUND"));
  }
  return authUser;
};
