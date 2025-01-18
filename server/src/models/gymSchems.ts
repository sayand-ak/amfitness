import mongoose, { Schema } from "mongoose";
import { Gym } from "../types/Gym";


const GymSchema: Schema = new Schema<Gym>(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      contactNumber: {
        type: String,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
    }
  );
  
  // Pre-save middleware to handle password hashing
  GymSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  });
  
  // Create and export the Gym model
  const GymModel = mongoose.model<Gym>("Gym", GymSchema);
  export default GymModel;