import { makeObservable, observable, action } from "mobx";
import { CarListing } from "../Types/listing.type";
import { Company } from "../Types/company.type";
import { Filter } from "../Types/filter.type";
import { Sorting } from "../Types/sorting.types";
import { mockList , companyList } from "./MockLists"

export class ListingStore {

    listings: CarListing[] = [];

    companyList: Company[] = companyList;

    currentPageList: CarListing[] = [];

    page:number = 0;

    filter: Filter = {
        make: null,
        engine: null,
    }

    sorting: Sorting = {
        sortBy: null,
        order: null,
    }

    listingsPerPage: number = 8;
    
    maxPages: number = 1;

    constructor() {
        makeObservable(this, {
            listings: observable,
            companyList: observable,
            page: observable,
            sorting: observable,
            filter: observable,
            currentPageList: observable,
            setListings: action,
            maxPages: observable,
            setMakeFilter: action,
            setEngineFilter: action,
            setHorsepowerSorting: action,
            setPriceSorting: action,
            paginate: action,
            incrementPage: action,
            decrementPage: action,
            setPage: action,
        });
    }

    setListings = () => {
        this.page = 0;
        this.listings = mockList;

        this.filterList();

        this.sortList();

        this.maxPages = Math.ceil(this.listings.length / this.listingsPerPage);
    }

    setMakeFilter = (event: React.FormEvent<HTMLSelectElement>) =>  {
        if (event.currentTarget.value === "M-N/A") {
            this.filter.make = null;
            return;
        }
        
        this.filter.make = event.currentTarget.value;
        
    }

    setEngineFilter = (event: React.FormEvent<HTMLSelectElement>) =>  {
        if (event.currentTarget.value === "E-N/A") {
            this.filter.engine = null;
            return
        } 
        
        this.filter.engine = event.currentTarget.value
       
    }

    filterList = () => {
        if (this.filter.make) {
            this.listings = this.listings.filter(item => item.make === this.filter.make);
        }

        if (this.filter.engine) {
            this.listings = this.listings.filter(item => item.engine === this.filter.engine);
        }
    }

    setHorsepowerSorting = (event: React.FormEvent<HTMLSelectElement>) =>{
        if (event.currentTarget.value === "none") {
            this.sorting.sortBy = null;
            this.sorting.order = null;
            return;
        }

        this.sorting.sortBy = "horsepower";

        this.sorting.order = event.currentTarget.value;
    }

    setPriceSorting = (event: React.FormEvent<HTMLSelectElement>) =>{
        if (event.currentTarget.value === "none") {
            this.sorting.sortBy = null;
            this.sorting.order = null;
            return;
        }

        this.sorting.sortBy = "price";

        this.sorting.order = event.currentTarget.value;
    }

    sortList = () => {
        if (!this.sorting.sortBy) {
            return;
        }

        if (this.sorting.sortBy === "price") {
            if (this.sorting.order === "highest") {

                this.listings = [...this.listings].sort(function(listing1, listing2){return listing2.price - listing1.price});
                return;
            }

            this.listings = [...this.listings].sort(function(listing1, listing2){return listing1.price - listing2.price});
            return;
        }

        if (this.sorting.order === "highest") {

            this.listings = [...this.listings].sort(function(listing1, listing2){return listing2.horsepower - listing1.horsepower});
            return;
        }

        this.listings = [...this.listings].sort(function(listing1, listing2){return listing1.horsepower - listing2.horsepower});
        return;

    }

    paginate = () => {
        if (this.page !== 0) {
            this.currentPageList = this.listings.slice((this.page - 1) * this.listingsPerPage, this.page* this.listingsPerPage);
            return;
        }

        this.page = 1;
    }

    incrementPage = () => {
        if (this.page === this.maxPages) return;

        ++this.page;
    }

    decrementPage = () => {
        if (this.page === 1 ) return;

        --this.page;
    }

    setPage = (page:number) => {
        this.page = page;
    }
}

export const listingStore = new ListingStore();