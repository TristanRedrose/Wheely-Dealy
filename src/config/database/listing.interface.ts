import mongoose, { Document, Types } from "mongoose";

export default interface IListing extends Document {
    listedBy: Types.ObjectId;
    description: String;
    company: String;
    model: String;
    engine: String;
    horsepower: Number;
    price: Number;
    createdAt: Date;
    updatedAt: Date;
    image?: String;
}