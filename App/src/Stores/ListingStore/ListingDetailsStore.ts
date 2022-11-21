import { makeObservable, observable, action } from "mobx";
import { CarListing} from "../../Types/listing.type";
import { getListingDetails } from "../../Services/Listing.service";

export class ListingDetailsStore {

    isLoading: boolean = false;

    listing: CarListing | undefined = undefined;

    constructor() {
        makeObservable(this, {
            isLoading: observable,
            setLoadingStatus: action,
            setListing: action,
            listing: observable,
            getListing: action,
            clearListingData: action,
        });
    }

    setLoadingStatus= (status:boolean): void => {
        this.isLoading = status;
    }

    setListing = (listing: CarListing | undefined): void => {
        this.listing = listing;
    }

    clearListingData = ():void => {
        this.setListing(undefined);
        this.setLoadingStatus(false);
    }

    getListing = async (id:string): Promise<void> => {
        this.setLoadingStatus(true)
        let listing = await getListingDetails(id);
        if (listing !== undefined) {
            this.setListing(listing);
        }
        this.setLoadingStatus(false);
    }
}