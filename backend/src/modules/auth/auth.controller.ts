import { Request, Response } from "express";

import { registerUser } from "./auth.service";
import { generateToken } from "../../utils/jwt";

export const register = async (
  req: Request,
  res: Response
) => {
  const user = await registerUser(req.body);

  const token = generateToken(user._id.toString());

  res.status(201).json({
    success: true,

    token,

    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
    },
  });
};

export const login = async (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Login endpoint",
  });
};

export const refreshToken = async (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Refresh token endpoint",
  });
};