const cloudinary = require("cloudinary").v2;
const dotenv = require('dotenv');
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (file, folderName = 'default_folder') => {
    try {
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: folderName, resource_type: 'auto' },  
                (error, result) => {
                    if (error) {
                        reject(new Error("Image upload failed"));
                    } else {
                        resolve(result);
                    }
                }
            );
            stream.end(file.buffer); // End the stream with the image buffer
        });

        // Return only the URL and public_id
        return {
            url: result.secure_url,
            public_id: result.public_id
        };
    } catch (error) {
        throw new Error("Image upload failed: " + error.message);  
    }
};

module.exports = { uploadImage };
