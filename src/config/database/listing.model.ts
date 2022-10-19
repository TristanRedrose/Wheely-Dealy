import mongoose, { Schema, model } from "mongoose";
import IListing from "./listing.interface";

const listingSchema = new Schema<IListing> (
    {
        listedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        company: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        engine: {
            type: String,
            required: true,
        },
        horsepower: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
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
)

export default model<IListing>('Listing', listingSchema);
