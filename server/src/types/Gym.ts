import mongoose from "mongoose";

export interface Gym extends Document {
    _id?: mongoose.Types.ObjectId;
    username: string;
    password: string;
    email: string;
    name: string;
    address: string;
    contactNumber: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  