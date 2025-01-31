const multer = require('multer');

// Configure multer to store file in memory
const storage = multer.memoryStorage();

// Configure multer with validation
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB limit
        files: 1 // Allow only 1 file per request
    },
    fileFilter: (req, file, cb) => {
        // Check if the file is an image
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }

        // Check for specific image formats
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error('Only .jpg, .jpeg and .png formats are allowed!'), false);
        }

        cb(null, true);
    }
});

module.exports = upload;