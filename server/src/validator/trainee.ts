import { body } from 'express-validator';

export const validateTrainee = [
  body('uid')
    .isString()
    .notEmpty()
    .withMessage('UID is required')
    .isLength({ min: 3 })
    .withMessage('UID must be at least 3 characters long'),
  body('name')
    .isString()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('address')
    .isString()
    .notEmpty()
    .withMessage('Address is required'),
  body('mobileNo')
    .isString()
    .notEmpty()
    .withMessage('Mobile number is required')
    .matches(/^[0-9]{10}$/)
    .withMessage('Mobile number must be a valid 10-digit number'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email must be valid'),
  body('age')
    .isInt({ min: 1, max: 120 })
    .withMessage('Age must be a valid number between 1 and 120'),
  body('workoutTime')
    .isString()
    .notEmpty()
    .withMessage('Workout time is required')
    .isIn(['morning', 'evening', 'flexible'])
    .withMessage('Workout time must be "morning", "evening", or "flexible"'),
  body('image')
    .optional()
    .isString()
    .withMessage('Image must be a valid string (if provided)'),
];
