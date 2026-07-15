import { Request, Response } from "express";

export const getCurrentUser = (
  req: Request,
  res: Response
) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user?._id,
      name: req.user?.name,
      email: req.user?.email,
      profilePicture:
        req.user?.profilePicture,
    },
  });
};