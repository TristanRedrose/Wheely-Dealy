import { makeObservable, observable, action } from "mobx";
import { CarListing } from "../Types/listing.type";
import { Company } from "../Types/company.type";
import { Filter } from "../Types/filter.type";
import { Sorting } from "../Types/sorting.types";
import { companyList } from "./MockLists";
import { getListingPage } from "../Services/Listing.service";

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

    isLoading: boolean = true;

    constructor() {
        makeObservable(this, {
            listings: observable,
            companyList: observable,
            page: observable,
            sorting: observable,
            filter: observable,
            maxPages: observable,
            isLoading: observable,
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
        });
    }

    clearListings = (): void => {
        this.listings = [];
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

    getListings = async(): Promise<void> =>{
        let list: CarListing[] = []
        let max: number = 0
        this.setLoadingStatus(true);
        await getListingPage(this.filter, this.sorting, this.page).then(function (result) {
            if (result === undefined) {
                list = [];
                return;
            }

            console.log(result);
            list = result.listing;
            max = result.maxPages
        });
        this.setLoadingStatus(false);
        this.setListings(list);
        this.setMaxPages(max);
    }

    setMakeFilter = (event: React.FormEvent<HTMLSelectElement>): void =>  {
        this.page = 1;
        if (event.currentTarget.value === "M-N/A") {
            this.filter.make = null;
            return;
        }
        
        this.filter.make = event.currentTarget.value;
    }

    setEngineFilter = (event: React.FormEvent<HTMLSelectElement>): void =>  {
        this.page = 1;
        if (event.currentTarget.value === "E-N/A") {
            this.filter.engine = null;
            return
        } 
        
        this.filter.engine = event.currentTarget.value
    }

    setHorsepowerSorting = (event: React.FormEvent<HTMLSelectElement>): void =>{
        this.page = 1;
        if (event.currentTarget.value === "none") {
            this.sorting.sortBy = null;
            this.sorting.order = null;
            return;
        }

        this.sorting.sortBy = "horsepower";

        this.sorting.order = event.currentTarget.value;
    }

    setPriceSorting = (event: React.FormEvent<HTMLSelectElement>): void =>{
        this.page = 1;
        if (event.currentTarget.value === "none") {
            this.sorting.sortBy = null;
            this.sorting.order = null;
            return;
        }

        this.sorting.sortBy = "price";

        this.sorting.order = event.currentTarget.value;
    }

    incrementPage = (): void => {
        if (this.page === this.maxPages) return;

        ++this.page;
    }

    decrementPage = (): void => {
        if (this.page === 1 ) return;

        --this.page;
    }

    setPage = (page:number): void => {
        this.page = page;
    }
}

export const listingStore = new ListingStore();