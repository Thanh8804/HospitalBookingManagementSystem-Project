import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

const handleUploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'hospital-bookingcare' },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        const result = await streamUpload(req);
        return res.status(200).json({ url: result.secure_url });
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({ message: 'Upload failed' });
    }
};

export default {
    handleUploadFile,
};
