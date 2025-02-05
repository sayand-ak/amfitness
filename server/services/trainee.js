const Trainee = require('../models/trainee');
const { uploadImage } = require('../config/cloudinary');

const addTraineeService = async (data, imageFile) => {
    const { first_name, last_name, gender, dob, address, place, mobile_number, email, workout_time, height, weight, admission_no } = data;

    // Check if email or phone number already exists
    const existingUser = await Trainee.findOne({ $or: [{ email }, { mobile_number }] });
    if (existingUser) {
        throw { status: 400, message: "A trainee with this email or mobile number already exists" };
    }

    // If admission_no is provided, check if it's already taken
    let generatedAdmissionNo = admission_no;
    if (admission_no) {
        const existingAdmission = await Trainee.findOne({ admission_no });
        if (existingAdmission) {
            throw { status: 400, message: "This admission number is already assigned to another trainee" };
        }
    } else {
        const count = await Trainee.countDocuments();
        generatedAdmissionNo = 3500 + count + 1;
    }

    // Handle image upload
    let imageData = {};
    if (imageFile) {
        const uploadedImage = await uploadImage(imageFile);
        console.log(uploadedImage);
        imageData = {
            public_id: uploadedImage.public_id,
            url: uploadedImage.url,
        };
    }

    // Create and save trainee
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
        admission_no: generatedAdmissionNo,
        image: imageData,
    });

    return await newTrainee.save();
};

const listTraineesService = async (query) => {
    // Pagination
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    // Sorting
    const sortField = query.sortField || 'admission_date';
    const sortOrder = query.sortOrder === 'asc' ? 1 : -1;

    // Filtering
    const filter = {};
    if (query.status) {
        filter.status = query.status;
    }

    // Get total count for pagination
    const total = await Trainee.countDocuments(filter);

    // Fetch trainees
    const trainees = await Trainee.find(filter)
        .select('first_name last_name admission_no admission_date status image full_name')
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean();

    return {
        data: trainees,
        pagination: {
            total,
            page,
            totalPages: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1,
            limit
        }
    };
};

module.exports = { addTraineeService, listTraineesService };
