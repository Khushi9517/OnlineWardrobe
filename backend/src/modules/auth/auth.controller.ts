import { Request, Response } from "express";

export const register = async (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Register endpoint",
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