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

    page:number = 1;

    filter: Filter = {
        make: null,
        engine: null,
    }

    sorting: Sorting = {
        sortBy: null,
        order: null,
    }

    listingsPerPage: number = 8;
    
    maxPages: number = 1

    constructor() {
        makeObservable(this, {
            listings: observable,
            companyList: observable,
            page: observable,
            sorting: observable,
            filter: observable,
            currentPageList: observable,
            getCurrentList: action,
            maxPages: observable,
            setFilter: action,
            setHorsepowerSorting: action,
            setPriceSorting: action,
            paginate: action,
            incrementPage: action,
            decrementPage: action,
            setPage: action,
        });
    }

    getCurrentList = () => {
        this.page = 1;
        this.listings = mockList;

        this.filterList();

        this.sortList();

        this.maxPages = Math.ceil(this.listings.length / this.listingsPerPage);
    }

    setFilter = (event: React.FormEvent<HTMLSelectElement>) =>  {
        if (event.currentTarget.value === "M-N/A") {
            this.filter.make = null
        } else if (event.currentTarget.value === "E-N/A") {
            this.filter.engine = null
        } else if (event.currentTarget.value === "diesel" || event.currentTarget.value === "petrol") {
            this.filter.engine = event.currentTarget.value
        } else {
            this.filter.make = event.currentTarget.value
        }
    }

    filterList = () => {
        if (!this.filter.engine && !this.filter.make) {
            return;
        }

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
                console.log(this.listings);
                return;
            }

            this.listings = [...this.listings].sort(function(listing1, listing2){return listing1.price - listing2.price});
            console.log(this.listings);
            return;
        }

        if (this.sorting.order === "highest") {

            this.listings = [...this.listings].sort(function(listing1, listing2){return listing2.horsepower - listing1.horsepower});
            console.log(this.listings);
            return;
        }

        this.listings = [...this.listings].sort(function(listing1, listing2){return listing1.horsepower - listing2.horsepower});
        console.log(this.listings);
        return;

    }

    paginate = () => {
        this.currentPageList = this.listings.slice((this.page - 1) * this.listingsPerPage, this.page* this.listingsPerPage);
        console.log("did paginate")
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