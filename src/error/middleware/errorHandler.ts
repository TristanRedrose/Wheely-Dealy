import BaseError from "../classes/baseError";


export function isTrustedError(error: Error): boolean {
    return error instanceof BaseError && error.isOperational;
}