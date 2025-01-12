import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';
import { Trainee } from '../types/Trainee';
import { CustomError } from './../utils/CustomError';
import bcrypt from 'bcryptjs'

const login = async (username: string, password: string) => {
    try {
        const gymUser = await prisma.gym.findUnique({
            where: {
                username: username,
            },
        });

        // If the user is not found
        if (!gymUser) {
            throw new CustomError("User not found", 404);
        }


        const isPasswordValid = await bcrypt.compare(await bcrypt.hash(password, 10), gymUser.password);
        if (isPasswordValid) {
            throw new CustomError("Invalid credentials", 401);
        }
        console.log("Successfully logged in")
        // If login is successful, you can return a success message or user data
        return {
            message: "Login successful",
            username: gymUser.username,
        };

    } catch (error) {
        throw error;
    }
}

const addTrainee = async (traineeData: Trainee) => {
    try {
        // Check if a trainee with the same mobile number or email already exists
        const existingTrainee = await prisma.trainee.findFirst({
            where: {
                OR: [
                    { mobile_number: traineeData.mobile_number },
                    traineeData.email && { email: traineeData.email },
                ].filter(Boolean) as Prisma.TraineeWhereInput[],
            },
        });

        if (existingTrainee) {
            throw new CustomError(
                "Trainee with this mobile number or email already exists",
                400
            );
        }

        // Create the trainee
        const newTrainee = await prisma.trainee.create({
            data: {
                ...traineeData,
                email: traineeData.email || "",
                is_active: traineeData.is_active ?? true,
                created_at: new Date(),
                updated_at: new Date(),
            },
        });

        return {
            message: "Trainee added successfully",
            trainee: newTrainee,
        };
    } catch (error) {
        throw error;
    }
};

const viewTrainees = async () => {
    try {
        const trainees = await prisma.trainee.findMany();
        if(trainees.length === 0){
            throw new CustomError("No trainees found", 404);
        } 
        return {
            message: "Fetched trainees successfully",
            trainee: trainees,
        };
    } catch (error) {
        throw error;
    }
}

export default {
    login,
    addTrainee,
    viewTrainees
}