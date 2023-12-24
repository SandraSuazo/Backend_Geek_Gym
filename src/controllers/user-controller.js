import { Auth } from "../models/auth-model.js";
import { User } from "../models/user-model.js";
import { CONFIG } from "../core/config.js";
import { validateEmail, validatePassword } from "../shared/validators.js";

export const profileUser = async (userId, next) => {
  const authUser = await Auth.findById(userId);
  if (!authUser) {
    throw new Error(next("USER_NOT_FOUND"));
  }

  let user = await User.findById(userId);
  if (!user) {
    throw new Error(next("USER_NOT_FOUND"));
  }

  return { authUser, user };
};

export const updateProfile = async (userId, updatedData, next) => {
  if (updatedData.email !== undefined) {
    validateEmail(updatedData.email, next);
  }

  if (updatedData.password !== undefined) {
    validatePassword(updatedData.password, next);
    const hashedPassword = await bcrypt.hash(
      updatedData.password,
      CONFIG.HASH_ROUNDS
    );
    updatedData.password = hashedPassword;
  }

  const authUser = await Auth.findByIdAndUpdate(userId, updatedData);
  if (!authUser) {
    throw new Error(next("USER_NOT_FOUND"));
  }

  let user = await User.findByIdAndUpdate(userId, updatedData);
  if (!user) {
    user = await User.create({
      _id: userId,
      ...updatedData,
    });
  }

  return "Modified user profile";
};

export const deactivateUser = async (userId, next) => {
  const authUser = await Auth.findById(userId);
  if (!authUser) {
    throw new Error(next("USER_NOT_FOUND"));
  }
  authUser.isActive = false;
  await authUser.save();
  return authUser;
};
