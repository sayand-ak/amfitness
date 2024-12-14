import { ITrainee } from './../types/Trainee';
import mongoose from "mongoose";

const traineeSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            required: true,
        },
        mobileNo: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
        },
        age: {
            type: Number,
            required: true,
        },
        workoutTime: {
            type: String,
            enum: ["morning", "evening", "flexible"],
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model<ITrainee>("Trainee", traineeSchema);
