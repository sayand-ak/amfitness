const Trainee = require('../models/trainee');
const { uploadImage } = require('../services/cloudinary');

const addTrainee = async (req, res) => {
    try {
        const { first_name, last_name, gender, dob, address, place, mobile_number, email, workout_time, height, weight, admission_no } = req.body;
        const imageFile = req.file;

        let imageData = {};
        if (imageFile) {
            const uploadedImage = await uploadImage(imageFile);
            imageData = {
                public_id: uploadedImage.public_id,
                url: uploadedImage.secure_url,
            };
        }

        const newTrainee = new Trainee({
            first_name,
            last_name,
            gender,
            dob,
            address,
            place,
            mobile_number,
            email,
            workout_time,
            height,
            weight,
            admission_no,
            image: imageData, // Store both public_id and url
        });

        await newTrainee.save();
        res.status(201).json({ message: 'Trainee added successfully', data: newTrainee });
    } catch (error) {
        res.status(500).json({ message: 'Error adding trainee', error: error.message });
    }
};

// // Basic usage
// GET /api/trainee/list

// // With pagination
// GET /api/trainee/list?page=1&limit=20

// // With sorting
// GET /api/trainee/list?sortField=admission_no&sortOrder=asc

// // With status filter
// GET /api/trainee/list?status=active

// // Combined
// GET /api/trainee/list?page=1&limit=20&sortField=admission_date&sortOrder=desc&status=active

const listTrainees = async (req, res) => {
    try {
        // Add pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Add sorting
        const sortField = req.query.sortField || 'admission_date';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

        // Query with basic details and filtering
        const filter = {};
        if (req.query.status) {
            filter.status = req.query.status;
        }

        // Get total count for pagination
        const total = await Trainee.countDocuments(filter);

        // Fetch trainees with selected fields
        const trainees = await Trainee
            .find(filter)
            .select('first_name last_name admission_no admission_date status image full_name')
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit)
            .lean();

        // Calculate pagination info
        const totalPages = Math.ceil(total / limit);
        const hasNext = page < totalPages;
        const hasPrev = page > 1;

        res.status(200).json({
            data: trainees,
            pagination: {
                total,
                page,
                totalPages,
                hasNext,
                hasPrev,
                limit
            }
        });
    } catch (error) {
        console.error('Error listing trainees:', error);
        res.status(500).json({ message: 'Error fetching trainees', error: error.message });
    }
};


module.exports = { addTrainee, listTrainees };
