import { makeObservable, observable, action } from "mobx";
import { ListingData } from "../../Types/listing.type";
import { postNewListing, deleteListing, updateListing } from "../../Services/Listing.service";
import { toast } from "react-toastify";
import { ResultStatus } from "../../Types/auth.types";

export class ListingOperationsStore {

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
            clearListingOperationData: action,
            setOperationResults: action,
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

    addNewListing = async(newListing:ListingData): Promise<void> => {
        this.setLoadingStatus(true);
        const response = await postNewListing(newListing);
        this.setOperationResults(response);
    }

    setMessage = (message: string): void => {
        this.message = message;
    }

    setSuccess = (value: boolean): void => {
        this.actionSuccess = value;
    }

    clearListingOperationData = ():void => {
        this.setSuccess(false);
        this.setLoadingStatus(false);
    }

    deleteListing = async (id:string): Promise<void> => {
        this.setLoadingStatus(true);
        const deleteResponse = await deleteListing(id);
        this.setOperationResults(deleteResponse)
    }

    updateListing = async(id:string, listingData:ListingData): Promise<void> => {
        this.setLoadingStatus(true);
        const response = await updateListing(listingData, id);
        this.setOperationResults(response);
    }

    setOperationResults = (response: ResultStatus): void => {
        this.setSuccess(response.isSuccessful);
        this.setMessage(response.message);
        if (response.isSuccessful) this.notify();
        this.setLoadingStatus(false);
    }
}

export const listingOperationsStore = new ListingOperationsStore();