import listingStore from "../stores/listing.store";
import { NewListingData, PaginatedListings } from "../types/listing.types";
import { PagingParams } from "../types/listing.types";
import { Listing } from "../types/listing.types";

interface IListingService {
    addListing:(username: string, listingData: NewListingData) => Promise<boolean>;
    getListings:(pagingParams:PagingParams) => Promise<PaginatedListings>;
    getListing: (id:string) => Promise<Listing | null>;
    deleteListing: (id:string, username: string) => Promise<boolean>;
}

class ListingService implements IListingService {
    async addListing(username: string, listingData: NewListingData): Promise<boolean> {
        
        return await listingStore.addListing(username, listingData);
    }

    async getListings(pagingParams:PagingParams):Promise<PaginatedListings> {
        return await listingStore.getListings(pagingParams);
    }

    async getListing(id:string): Promise<Listing | null> {
        return await listingStore.getListing(id);
    }

    async deleteListing(id:string, username:string): Promise<boolean> {
        return await listingStore.deleteListing(id, username);
    }
}

export default new ListingService as IListingService;