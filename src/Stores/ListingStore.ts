import { makeObservable, observable, action } from "mobx";
import { CarListing } from "../Types/listing.type";
import { Company } from "../Types/company.type";
import { Filter } from "../Types/filter.type";
import { Sorting } from "../Types/sorting.types";
import { companyList } from "./MockLists";
import { getListingById, getListingPage, postNewListing } from "../Services/Listing.service";

export class ListingStore {

    listings: CarListing[] = [];

    companyList: Company[] = companyList;

    page: number = 1;

    filter: Filter = {
        make: null,
        engine: null,
    }

    sorting: Sorting = {
        sortBy: null,
        order: null,
    }

    maxPages: number = 0;

    isLoading: boolean = false;

    isCancelled: boolean = false;

    newListing: CarListing = {
        id: 0,
        make: "",
        type: "",
        price: 0,
        horsepower: 0,
        image: "",
        engine: "",
    }

    listing: CarListing = {
        id: 0,
        make: "",
        type: "",
        price: 0,
        horsepower: 0,
        image: "",
        engine: "",
    }

    message: string = '';

    redirect: boolean = false;

    constructor() {
        makeObservable(this, {
            listings: observable,
            companyList: observable,
            page: observable,
            sorting: observable,
            filter: observable,
            maxPages: observable,
            isLoading: observable,
            message: observable,
            redirect: observable,
            setMakeFilter: action,
            setEngineFilter: action,
            setHorsepowerSorting: action,
            setPriceSorting: action,
            incrementPage: action,
            decrementPage: action,
            setPage: action,
            setListings: action,
            setMaxPages: action,
            clearListings: action,
            setLoadingStatus: action,
            setCancelStatus: action,
            setNewListingValue: action,
            setMessage: action,
            clearAddListings:action,
            getListing: action,
            setListing: action,
            listing:observable,
        });
    }

    clearListings = (): void => {
        this.setListings([]);
        this.setMaxPages(0);
        this.setLoadingStatus(false);
        this.filter = {
            make: null,
            engine: null,
        }

        this.sorting = {
            sortBy: null,
            order: null,
        }
        this.page = 1;
    }

    setCancelStatus= (status:boolean): void => {
        this.isCancelled = status;
    }

    setLoadingStatus= (status:boolean): void => {
        this.isLoading = status;
    }

    setListings = (list: CarListing[]): void => {
        this.listings = list;
    }

    setMaxPages = (maxPages:number): void => {
        this.maxPages = maxPages;
    }

    getCurrentListing() {
        if (this.isLoading) {
            this.setCancelStatus(true);
            return;
        }

        this.getListings();
    }

    getListings = async(): Promise<void> =>{
        let list: CarListing[] = []
        let max: number = 0
        this.setLoadingStatus(true);
        await getListingPage(this.filter, this.sorting, this.page).then((result) => {
            if (result === undefined) {
                list = [];
                return;
            }

            list = result.listing;
            max = result.maxPages
        });
        if (this.isCancelled) {
            this.setCancelStatus(false);
            this.getListings();
            return;
        }
        this.setLoadingStatus(false);
        this.setListings(list);
        this.setMaxPages(max);
    }

    setMakeFilter = (event: React.FormEvent<HTMLSelectElement>): void =>  {
        this.page = 1;
        if (event.currentTarget.value === "M-N/A") {
            this.filter.make = null;
            this.getCurrentListing();
            return;
        }
        
        this.filter.make = event.currentTarget.value;
        this.getCurrentListing();
    }

    setEngineFilter = (event: React.FormEvent<HTMLSelectElement>): void =>  {
        this.page = 1;
        if (event.currentTarget.value === "E-N/A") {
            this.filter.engine = null;
            this.getCurrentListing();
            return;
        } 
        
        this.filter.engine = event.currentTarget.value
        this.getCurrentListing();
    }

    setHorsepowerSorting = (event: React.FormEvent<HTMLSelectElement>): void =>{
        this.page = 1;
        if (event.currentTarget.value === "none") {
            this.sorting.sortBy = null;
            this.sorting.order = null;
            this.getCurrentListing();
            return;
        }

        this.sorting.sortBy = "horsepower";

        this.sorting.order = event.currentTarget.value;
        this.getCurrentListing();
    }

    setPriceSorting = (event: React.FormEvent<HTMLSelectElement>): void =>{
        this.page = 1;
        if (event.currentTarget.value === "none") {
            this.getCurrentListing();
            this.sorting.sortBy = null;
            this.sorting.order = null;
            return;
        }

        this.sorting.sortBy = "price";

        this.sorting.order = event.currentTarget.value;

        this.getCurrentListing();
    }

    incrementPage = (): void => {
        if (this.page === this.maxPages) return;

        ++this.page;

        this.getCurrentListing();
    }

    decrementPage = (): void => {
        if (this.page === 1 ) return;

        --this.page;

        this.getCurrentListing();
    }

    setPage = (page:number): void => {
        this.page = page;

        this.getCurrentListing();
    }

    setNewListingValue = (event: React.FormEvent<HTMLSelectElement | HTMLInputElement>): void => {
        const name = event.currentTarget.name
        const value = event.currentTarget.value
        this.setMessage('');

        switch (name) {
            case "company":
                this.newListing.make = value;
                break;
            case "price":
                this.newListing.price = +value;
                break;
            case "horsepower":
                this.newListing.horsepower = +value;
                break;
            case "type":
                this.newListing.type = value;
                break;
            case "image":
                this.newListing.image = value;
                break;
            case "engine":
                this.newListing.engine = value;
                break;

        }  
    }

    addNewListing = async(): Promise<void> => {
        const checkPassed = this.checkNewListValue();
        if (!checkPassed) {
            return;
        }
        this.setLoadingStatus(true);
        await postNewListing(this.newListing).then((result) => {
            if (result) {
                this.setMessage(result);
                setTimeout(() => {
                    this.setRedirect(true);
                }, 1000);
            }
        });
        this.setLoadingStatus(false);
    }

    setMessage = (message: string): void => {
        this.message = message;
    }

    setRedirect = (value: boolean): void => {
        this.redirect = value;
    }
 
    checkNewListValue = (): boolean => {
        let checkPassed = true;
        Object.entries(this.newListing).forEach(([key, value]) => {
            if ((key as string) !== "id" && !value) {
                this.setMessage("Please fill out the form");
                checkPassed = false;
                return checkPassed;
            };
        });
        return checkPassed;
    }

    resetNewListing = (): void => {
        this.newListing = {
            id: 0,
            make: "",
            type: "",
            price: 0,
            horsepower: 0,
            image: "",
            engine: "",
        }
    }

    clearAddListings = ():void => {
        this.resetNewListing();
        this.setRedirect(false);
        this.setMessage('');
    }

    setListing = (listing: CarListing): void => {
        this.listing = listing;
    }

    getListing = async(id:number): Promise<void> => {
        this.setLoadingStatus(true);
        await getListingById(id).then(result => {
            if (result !== undefined) {
                this.setListing(result);
            }
        });
        this.setLoadingStatus(false);
    }

    clearListing = ():void => {
        let listing = {
            id: 0,
            make: "",
            type: "",
            price: 0,
            horsepower: 0,
            image: "",
            engine: "",
        }

        this.setListing(listing);
    }

}

export const listingStore = new ListingStore();