import { ListingData } from "../Types/listing.type";
import { action, makeObservable, observable } from "mobx";

export class ListingFormStore {

    listingData: ListingData = {
        description:"",
        company: "",
        model: "",
        price: 0,
        horsepower: 0,
        image: "",
        engine: "",
    } 

    error: string = '';

    submitEnabled: boolean = false;

    constructor() {
        makeObservable (this, {
            listingData: observable,
            error: observable,
            setNewListingValue: action,
            setError: action,
            clearListingForm: action,
            submitEnabled: observable,
            setSubmitEnabled: action,
            setUpdateDefaultValue: action,
        })
    }

    setNewListingValue = (event: React.FormEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>): void => {
        const name = event.currentTarget.name
        const value = event.currentTarget.value
        this.setError('');

        switch (name) {
            case "company":
                this.listingData.company = value;
                break;
            case "price":
                this.listingData.price = +value;
                break;
            case "horsepower":
                this.listingData.horsepower = +value;
                break;
            case "type":
                this.listingData.model = value;
                break;
            case "image":
                this.listingData.image = value;
                break;
            case "engine":
                this.listingData.engine = value;
                break;
            case "description":
                this.listingData.description = value;
                break;
        }
        this.setSubmitEnabled(this.checkNewListValue());
    }

    checkNewListValue = (): boolean => {
        Object.entries(this.listingData).forEach(([key, value]) => {
            if ((key as string) !== "id" && !value) {
                return false;
            };
        });
        return true;
    }

    clearListingForm = (): void => {
        this.listingData = {
            description: "",
            company: "",
            model: "",
            price: 0,
            horsepower: 0,
            image: "",
            engine: "",
        }
    }

    setError = (error: string):void => {
        this.error = error;
    }

    setSubmitEnabled = (enabled: boolean): void => {
        this.submitEnabled = enabled;
    }

    setUpdateDefaultValue = (listingData: ListingData) => {
        this.listingData = listingData;
    }
}

export const listingFormStore = new ListingFormStore();