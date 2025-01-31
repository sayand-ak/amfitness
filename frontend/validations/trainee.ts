import * as Yup from 'yup';

const PHONE_REGEX = /^[0-9]{10}$/;
const NAME_REGEX = /^[A-Za-z\s]+$/;

// Validation schema
export const traineeValidationSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters')
        .matches(NAME_REGEX, 'First name should only contain letters'),
    
    last_name: Yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters')
        .matches(NAME_REGEX, 'Last name should only contain letters'),
    
    gender: Yup.string()
        .required('Gender is required')
        .oneOf(['male', 'female'], 'Please select a valid gender'),
    
    dob: Yup.date()
        .required('Date of birth is required')
        .max(new Date(), 'Date of birth cannot be in the future'),
    
    address: Yup.string()
        .required('Address is required')
        .min(5, 'Address must be at least 5 characters'),
    
    place: Yup.string()
        .required('Place is required')
        .min(2, 'Place must be at least 2 characters'),
    
    mobile_number: Yup.string()
        .required('Mobile number is required')
        .matches(PHONE_REGEX, 'Please enter a valid 10-digit mobile number'),
    
    email: Yup.string()
        .email('Please enter a valid email')
        .nullable(),
    
    workout_time: Yup.string()
        .required('Workout time is required')
        .oneOf(['morning', 'evening'], 'Please select either morning or evening'),
    
    height: Yup.string()
        .test('height', 'Height must be between 50 and 300 cm', function(value) {
            if (!value) return true;
            const num = parseFloat(value);
            return !isNaN(num) && num >= 50 && num <= 300;
        })
        .nullable(),
    
    weight: Yup.string()
        .test('weight', 'Weight must be between 20 and 500 kg', function(value) {
            if (!value) return true;
            const num = parseFloat(value);
            return !isNaN(num) && num >= 20 && num <= 500;
        })
        .nullable(),
    
    image: Yup.string()
        .required('Profile image is required'),
});