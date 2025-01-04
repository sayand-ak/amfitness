import prisma from '../config/prisma';
import { CustomError } from './../utils/CustomError';

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

        if (gymUser.password !== password) {
            throw new CustomError("Invalid credentials", 401);
        }

        // If login is successful, you can return a success message or user data
        return {
            message: "Login successful",
            user: gymUser,
        };

    } catch (error) {
        throw error;
    }
}

export = {
    login
}