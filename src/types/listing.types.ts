import { Types } from "mongoose";

export type Listing = {
    listedBy: Types.ObjectId;
    description: String;
    company: String;
    model: String;
    engine: String;
    horsepower: Number;
    price: Number;
    createdAt: Date;
    updatedAt: Date;
}

export type NewListing = {
    username: String,
    description: String;
    company: String;
    model: String;
    engine: String;
    horsepower: Number;
    price: Number;
}