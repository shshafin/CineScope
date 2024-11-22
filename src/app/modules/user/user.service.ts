import { TUser } from "./user.interface";
import { User } from "./user.model";

// !create user
const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

// !update user
const updateUserIntoDB = async (_id: string, payload: TUser) => {
  const result = await User.findByIdAndUpdate({ _id }, payload);
  return result;
};

export const userService = {
  createUserIntoDB,
  updateUserIntoDB,
};
