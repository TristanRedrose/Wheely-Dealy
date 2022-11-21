import mongoose, { Schema, model, PaginateModel } from "mongoose";
import IListing from "./listing.interface";
import paginate  from "mongoose-paginate-v2";

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
        image: {
            type: String,
        },
    }
)

listingSchema.plugin(paginate);


export default model<IListing, PaginateModel<IListing>>('Listing', listingSchema);
