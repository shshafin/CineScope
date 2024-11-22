import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { USER_Role, USER_STATUS } from "./user.const";
import bcryptjs from "bcryptjs";
import config from "../../config";

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: Object.keys(USER_Role),
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    enum: Object.keys(USER_STATUS),
    default: USER_STATUS.ACTIVE,
  },
  passwordChangedAt: {
    type: Date,
  },
});

// password hashing pre hook middleware
userSchema.pre("save", async function (next) {
  this.password = await bcryptjs.hash(
    this.password,
    Number(config.salt_rounds)
  );

  next();
});

// password hide post hook middleware
userSchema.post("save", function (doc, next) {
  doc.password = "";

  next();
});

export const User = model<TUser>("User", userSchema);
