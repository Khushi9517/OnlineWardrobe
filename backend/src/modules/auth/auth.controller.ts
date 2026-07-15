import { Request, Response } from "express";

import { registerUser } from "./auth.service";
import { generateToken } from "../../utils/jwt";
import { loginUser } from "./auth.service";

export const register = async (
  req: Request,
  res: Response
) => {
 const { user, token } = await registerUser(req.body);

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

export const login = async (
  req: Request,
  res: Response
) => {
  const { user, token } =
    await loginUser(req.body);

  res.status(200).json({
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

export const refreshToken = async (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Refresh token endpoint",
  });
};