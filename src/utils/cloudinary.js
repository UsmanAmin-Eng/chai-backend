import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';

const getErrorMessage = (error) => {
  const details =
    error && typeof error === 'object'
      ? error.error ?? error.cause ?? error.response
      : null;

  if (details) {
    const detailMessage = getErrorMessage(details);
    if (detailMessage !== '[object Object]') return detailMessage;
  }

  const message = error instanceof Error ? error.message : error?.message;
  if (typeof message === 'string' && message !== '[object Object]') return message;
  if (typeof error === 'string') return error;

  if (error && typeof error === 'object') {
    const info = {};
    for (const key of Object.getOwnPropertyNames(error)) {
      if (key !== 'stack' && key !== 'cause') info[key] = error[key];
    }
    try {
      return JSON.stringify(info);
    } catch {
      return 'Cloudinary returned an unrecognized error object';
    }
  }

  return String(error);
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) {
    throw new Error('Local file path is required');
  }
  // fs.unlink(localFilePath)

  const missingConfig = [
    ['CLOUDINARY_CLOUD_NAME', process.env.CLOUDINARY_CLOUD_NAME],
    ['CLOUDINARY_API_KEY', process.env.CLOUDINARY_API_KEY],
    ['CLOUDINARY_API_SECRET', process.env.CLOUDINARY_API_SECRET],
  ]
    .filter(([, value]) => !value?.trim())
    .map(([name]) => name);

  try {
    if (missingConfig.length > 0) {
      throw new Error(`Missing Cloudinary configuration: ${missingConfig.join(', ')}`);
    }

    return await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw new Error(
      `Cloudinary upload failed: ${getErrorMessage(error)}`,
      { cause: error }
    );
  } finally {
    try {
      await fs.unlink(localFilePath);
    } catch (error) {
      if (error?.code !== 'ENOENT') {
        throw error;
      }
    }
  }
};

export { uploadOnCloudinary };