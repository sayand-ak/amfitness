const { body } = require('express-validator');


const traineeValidationRules = [
    body('first_name')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
    
    body('last_name')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),

    body('gender')
        .notEmpty().withMessage('Gender is required')
        .isIn(['male', 'female', 'other']).withMessage('Invalid gender'),

    body('dob')
        .notEmpty().withMessage('Date of birth is required')
        .isISO8601().withMessage('Invalid date format')
        .custom(value => {
            if (new Date(value) > new Date()) {
                throw new Error('Date of birth cannot be in the future');
            }
            return true;
        }),

    body('address')
        .trim()
        .notEmpty().withMessage('Address is required')
        .isLength({ max: 200 }).withMessage('Address cannot exceed 200 characters'),

    body('place')
        .trim()
        .notEmpty().withMessage('Place is required'),

    body('mobile_number')
        .notEmpty().withMessage('Mobile number is required')
        .matches(/^\+?[\d\s-]{10,15}$/).withMessage('Invalid phone number'),

    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Please provide a valid email')
        .normalizeEmail(),

    body('workout_time')
        .notEmpty().withMessage('Workout time is required')
        .isIn(['morning', 'afternoon', 'evening']).withMessage('Invalid workout time'),

    body('height')
        .optional()
        .isFloat({ min: 0, max: 300 }).withMessage('Height must be between 0 and 300 cm'),

    body('weight')
        .optional()
        .isFloat({ min: 0, max: 500 }).withMessage('Weight must be between 0 and 500 kg'),

    body('status')
        .optional()
        .isIn(['active', 'inactive']).withMessage('Invalid status')
];

module.exports = traineeValidationRules;
