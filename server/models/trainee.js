const mongoose = require('mongoose');

const traineeSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    gender: String,
    dob: Date,
    address: String,
    place: String,
    mobile_number: String,
    email: String,
    workout_time: String,
    height: Number,
    weight: Number,
    admission_no: {
        type: String,
        unique: true,
        sparse: true
    },
    admission_date: {
        type: Date,
        default: Date.now
    },
    image: {
        public_id: String,
        url: String
    },
    status: {
        type: String,
        default: 'active'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Index for status
traineeSchema.index({ status: 1 });

// Virtual for full name
traineeSchema.virtual('full_name').get(function () {
    return `${this.first_name} ${this.last_name}`;
});


module.exports = mongoose.model('Trainee', traineeSchema);
