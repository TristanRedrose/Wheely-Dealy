class BaseError extends Error {
    readonly statusCode: number;
    readonly isOperational: boolean;
    readonly description: string;

    constructor(
        description:string,
        name:string,
        statusCode:number,
        isOperational:boolean,
    ) {
        super(<string>name);

        Object.setPrototypeOf(this, new.target.prototype)
        this.statusCode = statusCode
        this.isOperational = isOperational
        this.description = description
        Error.captureStackTrace(this)
    }
}

export default BaseError;