import { NextFunction, Request, Response } from "express";
import BaseError from "../classes/baseError";

const handleError = async(err:BaseError,req:Request, res:Response):Promise<Response> => {
    console.log(err);
    console.log('bunny ears');
    return res.status(err.statusCode || 500).json(err.description);
}

export function isTrustedError(error: Error): boolean {
    return error instanceof BaseError && error.isOperational;
}

export async function errorHandler(err: BaseError, req:Request, res:Response, next: NextFunction): Promise<void>{
    if (!isTrustedError(err)) {
        next(err);
        return;
    }
    await handleError(err, req, res);
}


