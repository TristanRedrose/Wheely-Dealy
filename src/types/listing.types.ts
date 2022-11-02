import { Types } from "mongoose";

export type Listing = {
    listedBy: Types.ObjectId;
    description: string;
    company: string;
    model: string;
    engine: string;
    horsepower: number;
    price: number;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type PaginatedListings = {
    listings: Listing[],
    maxPages: number,
    documentCount: number,
}

export type NewListingData = {
    description: string;
    company: string;
    model: string;
    engine: string;
    horsepower: number;
    price: number;
    image: string;
}

export type ListingUpdateData = {
    description?: string;
    company?: string;
    model?: string;
    engine?: string;
    horsepower?: number;
    price?: number;
    image?: string;
}

export type NewListing = {
    username: String,
    listingData: NewListingData,
}
type Filter = {
    company: string,
    engine: string,
}

export type PagingParams = {
    page: number,
    filter?: Filter,
    sorting?: string | null,
}

export type ListingId = {
    id:string;
}

export type DeleteListing = {
    username: string;
    id: string;
}

export type PopulatedListing = {
    listedBy: {_id: string, username:string};
    description: string;
    company: string;
    model: string;
    engine: string;
    horsepower: number;
    price: number;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

