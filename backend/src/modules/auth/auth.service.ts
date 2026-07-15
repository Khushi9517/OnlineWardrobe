import bcrypt from "bcryptjs";

import { AppError } from "../../utils/appError";
import { generateToken } from "../../utils/jwt";

import { User } from "./user.model";
import {
  RegisterUserInput,
  LoginUserInput,
} from "./auth.types";

export const registerUser = async (
  userData: RegisterUserInput
) => {
  const existingUser = await User.findOne({
    email: userData.email,
  });

  if (existingUser) {
    throw new AppError(
      "User already exists",
      409
    );
  }

  const hashedPassword = await bcrypt.hash(
    userData.password,
    10
  );

  const user = await User.create({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
  });

  const token = generateToken(
    String(user._id)
  );

  return {
    user,
    token,
  };
};

export const loginUser = async (
  userData: LoginUserInput
) => {
  const user = await User.findOne({
    email: userData.email,
  });

  if (!user) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const isPasswordValid = await bcrypt.compare(
    userData.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const token = generateToken(
    String(user._id)
  );

  return {
    user,
    token,
  };
};