import { IPayment } from './../types/Payment';
import mongoose, { Schema } from 'mongoose';


// Mongoose schema
const paymentSchema = new Schema<IPayment>(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true
    },
    traineeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trainee', 
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ['admission', 'fee'],
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ['manual', 'online'],
      required: true,
    },
    status: {
      type: String,
      enum: ['completed', 'partial', 'failed'],
      required: true,
    },
  },
  { timestamps: true } 
);

// Mongoose model
const Payment = mongoose.model<IPayment>('Payment', paymentSchema);

export default Payment;
