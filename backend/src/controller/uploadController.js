import path from 'path';

let handleUploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileUrl = `http://localhost:8000/uploads/${req.file.filename}`;
        return res.status(200).json({ url: fileUrl });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ message: 'Upload failed' });
    }
};

module.exports = {
    handleUploadFile,
};
