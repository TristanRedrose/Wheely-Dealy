import { makeObservable, observable, action } from "mobx";
import { CarListing } from "../Types/listing.type";
import { Company } from "../Types/company.type";
import { Filter } from "../Types/filter.type";
import { mockList , companyList } from "./MockLists"

export class ListingStore {

    listings: CarListing[] = mockList;

    companyList: Company[] = companyList;

    currentPageList: CarListing[] = [];

    filteredList:CarListing[] = [];

    sortedList: CarListing[] = [];

    unsortedList: CarListing[] = [];

    page:number = 1;

    filter: Filter = {
        make: null,
        engine: null,
    }

    listingsPerPage: number = 8;
    
    maxPages: number = 0

    isFiltered: boolean = false

    isSorted: boolean = false

    constructor() {
        makeObservable(this, {
            listings: observable,
            companyList: observable,
            page: observable,
            listingsPerPage: observable,
            filteredList: observable,
            maxPages: observable,
            currentPageList: observable,
            isFiltered: observable,
            isSorted: observable,
            filterList: action,
            sortByHorsepower: action,
            sortByPrice: action,
            paginate: action,
            incrementPage: action,
            decrementPage: action,
            setPage: action,
        });
    }

    getMaxPages(): void {
        this.maxPages = Math.ceil(this.filteredList.length / this.listingsPerPage)
    }

    filterList(event: React.FormEvent<HTMLSelectElement>): void  {
        this.page = 1;
        if (event.currentTarget.value === "M-N/A") {
            this.filter.make = null
        } else if (event.currentTarget.value === "E-N/A") {
            this.filter.engine = null
        } else if (event.currentTarget.value === "diesel" || event.currentTarget.value === "petrol") {
            this.filter.engine = event.currentTarget.value
        } else {
            this.filter.make = event.currentTarget.value
        }
        
        if (!this.filter.engine && !this.filter.make) {
            this.filteredList = [];
            this.isFiltered = false;
            return;
        }

        this.isFiltered = true;

        let tempList: CarListing[];

        if (this.isSorted) {
            tempList = this.sortedList;
        } else {
            tempList = mockList;
        }

        let unsortedTempList: CarListing[] = mockList

        if (this.filter.make) {
            tempList = tempList.filter(item => item.make === this.filter.make);

            unsortedTempList = unsortedTempList.filter(item => item.make === this.filter.make);
        }

        if (this.filter.engine) {
            tempList= tempList.filter(item => item.engine === this.filter.engine);

            unsortedTempList = unsortedTempList.filter(item => item.engine === this.filter.engine);
        }

        this.unsortedList = unsortedTempList;

        this.filteredList = tempList;
    }

    sortByHorsepower(event: React.FormEvent<HTMLSelectElement>): void {
        if (event.currentTarget.value === "none") {
            this.isSorted = false;
            if (this.isFiltered) {
                this.filteredList = this.unsortedList;
                return;
            }

            this.listings = mockList;
            return;
        }

        if (event.currentTarget.value === "highest") {
            this.isSorted = true;

            if (this.isFiltered) {
                this.filteredList = [...this.filteredList].sort(function(listing1, listing2){return listing2.horsepower - listing1.horsepower});
                this.sortedList = this.filteredList;
            }

            this.listings = [...this.listings].sort(function(listing1, listing2){return listing2.horsepower - listing1.horsepower});
            this.sortedList = this.listings;
            return;
        }

        this.isSorted = true;

        if (this.isFiltered) {
            this.filteredList = [...this.filteredList].sort(function(listing1, listing2){return listing1.horsepower - listing2.horsepower});
            this.sortedList = this.filteredList;
        }

        this.listings = [...this.listings].sort(function(listing1, listing2){return listing1.horsepower - listing2.horsepower});
        this.sortedList = this.listings;
    }

    sortByPrice(event: React.FormEvent<HTMLSelectElement>): void {
        if (event.currentTarget.value === "none") {
            this.isSorted = false;
            if (this.isFiltered) {
                this.filteredList = this.unsortedList;
                return;
            }

            this.listings = mockList;
            return;
        }

        if (event.currentTarget.value === "highest") {
            this.isSorted = true;

            if (this.isFiltered) {
                this.filteredList = [...this.filteredList].sort(function(listing1, listing2){return listing2.price - listing1.price});
                this.sortedList = this.filteredList;
            }

            this.listings = [...this.listings].sort(function(listing1, listing2){return listing2.price - listing1.price});
            this.sortedList = this.listings;
            return;
        }

        this.isSorted = true;

        if (this.isFiltered) {
            this.filteredList = [...this.filteredList].sort(function(listing1, listing2){return listing1.price - listing2.price});
            this.sortedList = this.filteredList;
        }

        this.listings = [...this.listings].sort(function(listing1, listing2){return listing1.price - listing2.price});
        this.sortedList = this.listings;
    }

    paginate():void {
        let currentList: CarListing[] = [];

        if (this.isFiltered === true) {
            currentList = this.filteredList;
        } else {
            currentList = this.listings;
        }

        this.maxPages = Math.ceil(currentList.length / this.listingsPerPage);

        this.currentPageList = currentList.slice((this.page - 1) * 8, this.page* 8);
    }

    incrementPage() {
        if (this.page === this.maxPages) return;

        ++this.page;
    }

    decrementPage() {
        if (this.page === 1 ) return;

        --this.page;
    }

    setPage(page:number) {
        this.page = page;
        console.log(page);
    }

}

export const listingStore = new ListingStore();