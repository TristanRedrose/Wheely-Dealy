import mongoose, { Schema, model } from "mongoose";
import IUser from "./user.interface";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
        },
        createdAt: {
            type: Date,
            immutable: true,
            defaut: () => Date.now(),
        },
        updatedAt:{
            type: Date,
            defaut: () => Date.now(),
        },
    }
);

export default model<IUser>("User", userSchema);