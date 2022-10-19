import listingStore from "../stores/listing.store";
import { Listing, NewListing } from "../types/listing.types";

interface IListingService {
    addListing:(listing:NewListing) => Promise<string>;
    getListings:() => Promise<Listing[]>;
}

class ListingService implements IListingService {
    async addListing(listing:NewListing): Promise<string> {
        return await listingStore.addListing(listing);
    }

    async getListings():Promise<Listing[]> {
        return await listingStore.getListings();
    }
}

export default new ListingService as IListingService;