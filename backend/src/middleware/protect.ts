import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/appError";
import { verifyToken } from "../utils/jwt";

import { User } from "../modules/auth/user.model";

export const protect = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    return next(
      new AppError(
        "Not authorized, token missing",
        401
      )
    );
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyToken(token);

  const user = await User.findById(
    decoded.userId
  );

  if (!user) {
    return next(
      new AppError(
        "User no longer exists",
        401
      )
    );
  }

  req.user = user;

  next();
};