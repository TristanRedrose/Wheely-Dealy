import listingStore from "../stores/listing.store";
import { NewListing, PaginatedListings } from "../types/listing.types";
import { PagingParams } from "../types/listing.types"

interface IListingService {
    addListing:(listing:NewListing) => Promise<string>;
    getListings:(pagingParams:PagingParams) => Promise<PaginatedListings>;
}

class ListingService implements IListingService {
    async addListing(listing:NewListing): Promise<string> {
        return await listingStore.addListing(listing);
    }

    async getListings(pagingParams:PagingParams):Promise<PaginatedListings> {
        return await listingStore.getListings(pagingParams);
    }
}

export default new ListingService as IListingService;