export class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;

        // Set the prototype explicitly for inheritance
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
