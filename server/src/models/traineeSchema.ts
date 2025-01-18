import mongoose, { Schema } from "mongoose";
import { Trainee } from "../types/Trainee";

const TraineeSchema: Schema = new Schema<Trainee>(
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      gender: { type: String, required: true },
      dob: { type: Date, required: true },
      address: { type: String, required: true },
      place: { type: String, required: true },
      mobile_number: { type: String, required: true },
      email: { type: String, required: false },
      workout_time: { type: String, required: true },
      height: { type: Number, required: true },
      weight: { type: Number, required: true },
      status: { type: String, required: true },
      is_active: { type: Boolean, default: true },
      created_at: { type: Date, default: Date.now },
      updated_at: { type: Date, default: Date.now },
    },
    {
      timestamps: true, 
    }
  );
  
  // Create the model from the schema
  const TraineeModel = mongoose.model<Trainee>("Trainee", TraineeSchema);
  
  export default TraineeModel;