import { Response } from "express";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";
import { AuthRequest } from "../types";

// @route POST /api/upload  (multipart/form-data, field name "images", up to 5)
// Streams each buffered file straight to Cloudinary and returns the secure URLs.
export const uploadImages = async (req: AuthRequest, res: Response) => {
  const files = req.files as Express.Multer.File[] | undefined;

  if (!files || files.length === 0) {
    return res.status(400).json({ success: false, message: "No files uploaded" });
  }

  try {
    const uploadOne = (file: Express.Multer.File): Promise<string> =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "hunar/products" },
          (error, result) => {
            if (error || !result) return reject(error);
            resolve(result.secure_url);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });

    const urls = await Promise.all(files.map(uploadOne));
    res.json({ success: true, urls });
  } catch (error) {
    res.status(500).json({ success: false, message: "Image upload to Cloudinary failed" });
  }
};
