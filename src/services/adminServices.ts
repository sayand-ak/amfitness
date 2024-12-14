import jwt from 'jsonwebtoken';
import Admin from "../model/Admin";
import { CustomError } from "../utils/CustomError";
import { ITrainee } from '../types/Trainee';
import Trainee from '../model/Trainee';
import { IPayment } from '../types/Payment';
import Payment from '../model/Payment';
import { v4 as uuidv4 } from 'uuid';

const login = async ({ email, password }: { email: string; password: string }) => {
    // Find user by email
    const user = await Admin.findOne({ email });
    if (!user) {
        throw new CustomError('Invalid credentials', 401);
    }

    // Check password
    const isPasswordValid = user.password === password;
    if (!isPasswordValid) {
        throw new CustomError('Invalid credentials', 401);
    }
    if(user) {
      // Generate access token
      const accessToken = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.ACCESS_TOKEN_SECRET!,
          { expiresIn: '15m' }
      );
  
      // Generate refresh token
      const refreshToken = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.REFRESH_TOKEN_SECRET!,
          { expiresIn: '7d' }
      );
  
      return {
          message: 'Login successful',
          user: {
              id: user._id,
              email: user.email,
          },
          accessToken,
          refreshToken,
      };
    }
};

const addTrainee = async(traineeData: ITrainee) => {
    const trainee = await Trainee.findOne({
        $or: [
            { email: traineeData.email },
            { mobileNo: traineeData.mobileNo }
        ]
    });
    if(trainee) {
        throw new CustomError('Trainee already exists', 400);
    }
    const newTrainee = await Trainee.create(traineeData);
    return {
        message: 'Trainee added successfully',
        trainee: newTrainee
    };
}

const manualPayment = async({traineeId, amount, paymentType, paymentMode="manual"}: IPayment) => {
    const transactionId = uuidv4();

    const trainee = await Trainee.findById(traineeId);
    if(!trainee) {
        throw new CustomError('Trainee not found', 404);
    }

    // Determine base pay based on age
    const basePay = trainee.age >= 18 ? 700 : 600;

    // Check amount conditions
    if(amount === 1000) {
        // Full payment
        const payment = await Payment.create({
            transactionId,
            traineeId,
            amount,
            paymentType,
            paymentMode,
            status: "completed"
        });
        return {
            message: 'Payment added successfully',
            payment
        };
    } else if(amount < 1000) {
        // Partial payment conditions
        if(amount < basePay) {
            throw new CustomError('Amount is less than the base pay', 400);
        }

        const payment = await Payment.create({
            transactionId,
            traineeId,
            amount,
            paymentType,
            paymentMode,
            status: "partial"
        });
        return {
            message: 'Payment added successfully',
            payment
        };
    } else {
        // Amount exceeds 1000
        throw new CustomError('Invalid payment amount', 400);
    }
}
export default {
    login,
    addTrainee,
    manualPayment
};