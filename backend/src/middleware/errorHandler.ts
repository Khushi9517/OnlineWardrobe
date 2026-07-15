import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode =
    "statusCode" in error
      ? Number((error as any).statusCode)
      : 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};