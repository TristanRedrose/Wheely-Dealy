import { Filter } from "./filter.type";

export interface CarListing {
    _id: string,
    company: string,
    model: string,
    price: number,
    image: string,
    description: string;
    listedBy: {_id: string, username: string};
    horsepower: number,
    engine:string
}

export interface ListingData {
    description: string;
    company: string;
    model: string;
    engine: string;
    horsepower: number;
    price: number;
    image: string;
}

export interface NewListingReq {
    token: string,
    listingData: ListingData;
}

export interface PagingParams {
    page: number | null;
    filter: Filter,
    sorting: string | null;
}

export interface PaginatedListings {
    paginatedListings: {
        listings: CarListing[],
        maxPages: number,
        documentCount: number,
    }
}