import { makeObservable, observable, action } from "mobx";
import { ListingData } from "../../Types/listing.type";
import { postNewListing, deleteListing, updateListing } from "../../Services/Listing.service";
import { ResultStatus } from "../../Types/auth.types";
import { NotificationStore } from "../NotificationStore";

export class ListingOperationsStore {

    isLoading: boolean = false;

    actionSuccess: boolean = false;

    notificationStore: NotificationStore;

    constructor(notificationStore: NotificationStore) {
        this.notificationStore = notificationStore
        makeObservable(this, {
            isLoading: observable,
            actionSuccess: observable,
            setSuccess:action,
            setLoadingStatus: action,
            clearListingOperationData: action,
            setOperationResults: action,
        });
    }

    notifySuccess = (message: string) => {
        this.notificationStore.notifySuccess(message);
    }

    setLoadingStatus= (status:boolean): void => {
        this.isLoading = status;
    }

    addNewListing = async(newListing:ListingData): Promise<void> => {
        this.setLoadingStatus(true);
        const response = await postNewListing(newListing);
        this.setOperationResults(response);
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
        if (response.isSuccessful) this.notifySuccess(response.message);
        this.setLoadingStatus(false);
    }
}