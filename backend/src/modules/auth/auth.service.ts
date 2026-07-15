import bcrypt from "bcryptjs";

import { User } from "./user.model";
import { RegisterUserInput } from "./auth.types";
import { AppError } from "../../utils/appError";

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

  return user;
};