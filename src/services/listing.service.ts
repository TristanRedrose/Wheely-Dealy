import listingStore from "../stores/listing.store";
import { NewListing, PaginatedListings } from "../types/listing.types";
import { PagingParams } from "../types/listing.types";
import { Listing } from "../types/listing.types";

interface IListingService {
    addListing:(listing:NewListing) => Promise<string>;
    getListings:(pagingParams:PagingParams) => Promise<PaginatedListings>;
    getListing: (id:string) => Promise<Listing | null>;
}

class ListingService implements IListingService {
    async addListing(listing:NewListing): Promise<string> {
        return await listingStore.addListing(listing);
    }

    async getListings(pagingParams:PagingParams):Promise<PaginatedListings> {
        return await listingStore.getListings(pagingParams);
    }

    async getListing(id:string): Promise<Listing | null> {
        return await listingStore.getListing(id);
    }
}

export default new ListingService as IListingService;