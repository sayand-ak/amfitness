const mongoose = require('mongoose');
const validator = require('validator');

const traineeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters'],
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters'],
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not a valid gender'
        }
    },
    dob: {
        type: Date,
        required: [true, 'Date of birth is required'],
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: 'Date of birth cannot be in the future'
        }
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
        maxlength: [200, 'Address cannot exceed 200 characters']
    },
    place: {
        type: String,
        required: [true, 'Place is required'],
        trim: true
    },
    mobile_number: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: true,  // This automatically creates an index
        validate: {
            validator: function (v) {
                return /^\+?[\d\s-]{10,15}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        sparse: true,
        unique: true,  // This automatically creates a sparse index
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        }
    },
    workout_time: {
        type: String,
        required: [true, 'Workout time is required'],
        enum: {
            values: ['morning', 'afternoon', 'evening'],
            message: '{VALUE} is not a valid workout time'
        }
    },
    height: {
        type: Number,
        min: [0, 'Height cannot be negative'],
        max: [300, 'Height cannot exceed 300 cm']
    },
    weight: {
        type: Number,
        min: [0, 'Weight cannot be negative'],
        max: [500, 'Weight cannot exceed 500 kg']
    },
    admission_no: {
        type: String,
        unique: true,  // This automatically creates an index
        sparse: true
    },
    admission_date: {
        type: Date,
        default: Date.now
    },
    image: {
        public_id: String,
        url: {
            type: String,
            validate: {
                validator: function (v) {
                    return !v || validator.isURL(v);
                },
                message: 'Invalid image URL'
            }
        }
    },
    status: {
        type: String,
        enum: {
            values: ['active', 'inactive'],
            message: '{VALUE} is not a valid status'
        },
        default: 'active'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Index for status - this one wasn't duplicate
traineeSchema.index({ status: 1 });

// Virtual for full name
traineeSchema.virtual('full_name').get(function () {
    return `${this.first_name} ${this.last_name}`;
});

// Pre-save middleware to ensure admission_no format
traineeSchema.pre('save', async function (next) {
    if (!this.admission_no) {
        const count = await this.constructor.countDocuments();
        this.admission_no = `TR${new Date().getFullYear()}${(count + 1).toString().padStart(4, '0')}`;
    }
    next();
});

module.exports = mongoose.model('Trainee', traineeSchema);