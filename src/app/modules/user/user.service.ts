import AppError from "../../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

// !create user
const createAdminIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

// !update user
const updateUserIntoDB = async (_id: string, payload: TUser) => {
  const result = await User.findByIdAndUpdate({ _id }, payload);
  return result;
};

// !update me
const updateMeIntoDB = async (email: string, payload: Partial<TUser>) => {
  const updatedUser = await User.findOneAndUpdate({ email }, payload);

  if (!updatedUser) {
    throw new AppError(404, "User not found");
  }

  return updatedUser;
};

export const userService = {
  createAdminIntoDB,
  updateUserIntoDB,
  updateMeIntoDB,
};
