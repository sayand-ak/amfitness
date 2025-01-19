import mongoose from "mongoose";

export interface Trainee {
    _id?: mongoose.Types.ObjectId; 
    first_name: string;
    last_name: string;
    gender: string;
    dob: Date;
    address: string;
    place: string;
    mobile_number: string;
    email?: string;
    workout_time: string;
    height: number;
    weight: number;
    status: string;
    is_active?: boolean;
    created_at: Date;
    updated_at: Date;
}
