import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error('Local file path is required');
        }

        // upload the file on the Cloudinary server.
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });

        // file has been uploaded successfully on the Cloudinary server.
        console.log('File uploaded successfully to Cloudinary', uploadResult.url);
        return uploadResult;
    } catch (error) {
        fs.unlinkSync(localFilePath); // delete the local file after upload
        return null; // return null if there is an error
    }
};

export { uploadOnCloudinary };