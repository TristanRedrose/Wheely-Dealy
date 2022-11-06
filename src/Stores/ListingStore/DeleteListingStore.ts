import { makeObservable, observable, action } from "mobx";
import { deleteListing } from "../../Services/Listing.service";
import { toast } from "react-toastify";

export class DeleteListingStore {

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
            deleteListing: action,
            notify: action,
            clearDeleteListingData: action,
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

    clearDeleteListingData = ():void => {
        this.setSuccess(false);
        this.setLoadingStatus(false);
    }

    deleteListing = async (id:string): Promise<void> => {
        this.setLoadingStatus(true);
        const deleteResponse = await deleteListing(id);
        this.setMessage(deleteResponse.message);
        this.setSuccess(deleteResponse.isSuccessful);
        this.setLoadingStatus(false);
    }
}

export const deleteListingStore = new DeleteListingStore();