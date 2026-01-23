import imagekit from "../config/imagekit.config";
import ApiError from "../utils/apiError";

export const uploadImage = async (
  file: Express.Multer.File,
  fileName: string,
  folder: string,
) => {
  if (!file) {
    throw new ApiError("No image provided", 400);
  }

  const mimeType = file.mimetype;
  if (!mimeType.startsWith("image/")) {
    throw new ApiError("Invalid image file", 400);
  }

  if (
    mimeType !== "image/jpg" &&
    mimeType !== "image/jpeg" &&
    mimeType !== "image/png"
  ) {
    throw new ApiError("Only JPG and PNG images are allowed", 400);
  }

  const uploadResponse = await imagekit.upload({
    file: file.buffer,
    fileName: fileName,
    folder: `/social${folder}`,
  });

  return uploadResponse;
};

export const deleteImage = async (fileId: string) => {
  try {
    const deleteResponse = await imagekit.deleteFile(fileId);
    return deleteResponse;
  } catch {
    throw new ApiError("Failed to delete image", 500);
  }
};
