import jwt, { SignOptions } from "jsonwebtoken";
import env from "../config/env";
import { JwtPayload } from "../types/auth.types";

export const generateToken = (
  userId: string
): string => {
  const options: SignOptions = {
    expiresIn:
      env.jwtExpiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(
    { userId },
    env.jwtSecret,
    options
  );
};

export const verifyToken = (
  token: string
): JwtPayload => {
  return jwt.verify(
    token,
    env.jwtSecret
  ) as JwtPayload;
};