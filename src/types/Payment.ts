import mongoose from "mongoose";

type PaymentType = 'admission' | 'fee';
type PaymentMode = 'manual' | 'online';
type PaymentStatus = 'completed' | 'partial' | 'failed';

export interface IPayment {
    transactionId: string;
    traineeId: mongoose.Types.ObjectId;
    amount: number;
    paymentType: PaymentType;
    paymentMode: PaymentMode;
    status: PaymentStatus;
}
