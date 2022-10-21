import { Types } from "mongoose";

export type Listing = {
    listedBy: Types.ObjectId;
    description: String;
    company: String;
    model: String;
    engine: String;
    horsepower: Number;
    price: Number;
    image?: String;
    createdAt: Date;
    updatedAt: Date;
}

type NewListingData = {
    description: String;
    company: String;
    model: String;
    engine: String;
    horsepower: Number;
    price: Number;
    image: String;
}

export type NewListingReq = {
    token: string;
    listingData: NewListingData
}

export type NewListing = {
    username: String,
    listingData: NewListingData,
}

