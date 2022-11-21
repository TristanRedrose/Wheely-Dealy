import jwt from "jsonwebtoken";
import { secretKey } from "../env/env";
import { tokenPayload } from "../types/shared.types";

export function getTokenPayload(token:string) {
    
    const decoded = jwt.verify(token, secretKey) as tokenPayload;
    return decoded.user;
}