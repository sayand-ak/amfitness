import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomError } from '../utils/CustomError'; // Adjust the import path

const errorMiddleware: ErrorRequestHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): any => {
    console.error("Error middleware", err);

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            message: err.message,
            statusCode: err.statusCode,
        });
    }

    // Add return here to prevent executing both blocks
    return res.status(500).json({
        message: 'Internal Server Error',
        statusCode: 500,
    });
};

export default errorMiddleware;
