import { Request, Response } from "express";

import { AppError } from "../../utils/appError";
import { uploadToCloudinary } from "../../utils/cloudinary";

export const uploadImage = async (
  req: Request,
  res: Response
) => {
  if (!req.file) {
    throw new AppError(
      "Image file is required",
      400
    );
  }

  const result = await uploadToCloudinary(
    req.file.buffer
  );

  res.status(200).json({
    success: true,

    imageUrl: result.secure_url,

    imagePublicId: result.public_id,
  });
};