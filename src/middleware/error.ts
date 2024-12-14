import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomError } from '../utils/CustomError'; // Adjust the import path

// Error handling middleware
const errorMiddleware: ErrorRequestHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error(err);

    // If the error is an instance of CustomError, send the specific error response
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            message: err.message,
            statusCode: err.statusCode,
        });
        return; 
    }

    // If it's a generic error, handle it differently
    console.error(err);

    // Send a generic error response for unexpected errors
    res.status(500).json({
        message: 'Internal Server Error',
        statusCode: 500,
    });
};

export default errorMiddleware;
