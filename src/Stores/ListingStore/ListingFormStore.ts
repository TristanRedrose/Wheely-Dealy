import { ListingData } from "../../Types/listing.type";
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

    errorMessage: string = '';
    
    errorCode: number = 0;

    submitDisabled: boolean = true;

    constructor() {
        makeObservable (this, {
            listingData: observable,
            errorCode: observable,
            errorMessage: observable,
            setNewListingValue: action,
            setError: action,
            clearListingForm: action,
            submitDisabled: observable,
            setSubmitDisabled: action,
            setUpdateDefaultValue: action,
        })
    }

    setNewListingValue = (event: React.FormEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>): void => {
        const name = event.currentTarget.name
        const value = event.currentTarget.value

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

        this.validateListingData();
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

        this.setSubmitDisabled(true);
    }

    setError = (errorCode: number, errorMessage: string):void => {
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
    }

    setSubmitDisabled = (enabled: boolean): void => {
        this.submitDisabled = enabled;
    }

    setUpdateDefaultValue = (listingData: ListingData) => {
        this.listingData = listingData;
    }

    validateListingData = (): void => {
        this.setError(0, '');

        const {company, engine, model, horsepower, price, image, description} = this.listingData;

        if (company.length === 0)  return this.setError(1, "Please enter company name");

        if (engine.length === 0)  return this.setError(2, "Please enter engine type");

        if (model.length === 0)  return this.setError(3, "Please enter model");

        if (description.length === 0)  return this.setError(4, "Please enter description");

        if (image.length === 0)  return this.setError(5, "Please enter valid image url");

        if (price <= 0)  return this.setError(6, "Please enter price");

        if (horsepower < 80 || horsepower > 150)  return this.setError(7, "Please enter valid horsepower");


        this.setSubmitDisabled(false);
    }
}

export const listingFormStore = new ListingFormStore();