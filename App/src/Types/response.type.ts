import { CarListing } from "./listing.type";

export interface Response {
    listing: CarListing[],
    maxPages: number,
}