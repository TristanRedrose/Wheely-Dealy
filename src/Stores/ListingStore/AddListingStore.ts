import { makeObservable, observable, action } from "mobx";
import { ListingData } from "../../Types/listing.type";
import { postNewListing } from "../../Services/Listing.service";
import { toast } from "react-toastify";

export class AddListingStore {

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
            clearAddListingData: action,
        });
    }

    setLoadingStatus= (status:boolean): void => {
        this.isLoading = status;
    }

    addNewListing = async(newListing:ListingData): Promise<void> => {
        this.setLoadingStatus(true);
        const response = await postNewListing(newListing);
        
        this.setSuccess(response.isSuccessful);
        this.setMessage(response.message);
        this.setLoadingStatus(false);
    }

    setMessage = (message: string): void => {
        this.message = message;
    }

    setSuccess = (value: boolean): void => {
        this.actionSuccess = value;
    }

    clearAddListingData = ():void => {
        this.setSuccess(false);
        this.setLoadingStatus(false);
    }

    notify = () => toast(this.message, {
        position:'top-right',
        autoClose:1000,
        theme:'dark',
        }
    );
}

export const addListingStore = new AddListingStore();