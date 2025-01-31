const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (file, folderName = 'default_folder') => {
    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: amfitness
        });
        return result;
    } catch (error) {
        throw new Error("Image upload failed");
    }
};

module.exports = { uploadImage };
