import { Auth } from "../models/auth-model.js";
import { User } from "../models/user-model.js";
import { validateEmail } from "../shared/validators.js";

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

export const getAllUsers = async (next) => {
  const authUsers = await Auth.find();
  const users = await User.find();
  if (!authUsers && !users) {
    throw new Error(next("USER_NOT_FOUND"));
  }
  return { authUsers, users };
};

export const getUserDetails = async (userId, next) => {
  const authUser = await Auth.findById(userId);
  const user = await User.findById(userId);
  if (!authUser && !user) {
    throw new Error(next("USER_NOT_FOUND"));
  }
  return { authUser, user };
};

export const deactivateUser = async (userId, next) => {
  const authUser = await Auth.findByIdAndUpdate(userId, { isActive: false });
  if (!authUser) {
    throw new Error(next("USER_NOT_FOUND"));
  }
  if (authUser.role === "admin") {
    throw new Error(next("ACCESS_DENIED"));
  }
  return authUser;
};

export const activateUser = async (userId, next) => {
  const authUser = await Auth.findByIdAndUpdate(userId, { isActive: true });
  if (!authUser) {
    throw new Error(next("USER_NOT_FOUND"));
  }
  if (authUser.role !== "customer") {
    throw new Error(next("ACCESS_DENIED"));
  }
  return authUser;
};
