import { makeObservable, observable, action } from "mobx";
import { ListingData } from "../../Types/listing.type";
import { updateListing } from "../../Services/Listing.service";
import { toast } from "react-toastify";

export class UpdateListingStore {

    isLoading: boolean = false;

    message: string = '';

    actionSuccess: boolean = false;

    constructor() {
        makeObservable(this, {
            isLoading: observable,
            message: observable,
            actionSuccess: observable,
            setSuccess:action,
            setLoadingStatus: action,
            setMessage: action,
            notify: action,
            clearUpdateData: action,
        });
    }

    notify = () => toast(this.message, {
        position:'top-right',
        autoClose:1000,
        theme:'dark',
        }
    );

    setLoadingStatus= (status:boolean): void => {
        this.isLoading = status;
    }

    setMessage = (message: string): void => {
        this.message = message;
    }

    setSuccess = (value: boolean): void => {
        this.actionSuccess = value;
    }

    clearUpdateData = ():void => {
        this.setSuccess(false);
        this.setLoadingStatus(false);
    }

    updateListing = async(id:string, listingData:ListingData): Promise<void> => {
        this.setLoadingStatus(true);
        const response = await updateListing(listingData, id);
        this.setSuccess(response.isSuccessful);
        this.setMessage(response.message);
        this.setLoadingStatus(false);
    }
}

export const updateListingStore = new UpdateListingStore();