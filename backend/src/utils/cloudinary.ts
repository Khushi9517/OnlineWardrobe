import { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folder = "online-wardrobe"
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          if (!result) {
            return reject(
              new Error("Cloudinary upload failed")
            );
          }

          resolve(result);
        }
      )
      .end(fileBuffer);
  });
};