import { Response, Request, NextFunction } from "express";
import { secretKey } from "../env/env";
import jwt from "jsonwebtoken";
import { getTokenPayload } from "../helpers/getTokenPayload";

export function verifyToken(req: Request, res:Response, next: NextFunction) {
    
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        if (!bearerToken) {
            return res.status(401).json({message: "Access denied, token not found"});
        }
        try {
            jwt.verify(bearerToken, secretKey)
        } catch (err) {
            return res.status(401).json({message: "Access denied, token failed verification"})
        }
        req.username = getTokenPayload(bearerToken).username;
        next();
    }
    else {
        return res.status(401).json({message: "Access denied, token not found"});
    };
};