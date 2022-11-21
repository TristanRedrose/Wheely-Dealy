import mongoose, { Document, Types } from "mongoose";

export default interface IListing extends Document {
    listedBy: Types.ObjectId;
    description: string;
    company: string;
    model: string;
    engine: string;
    horsepower: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    image?: string;
}