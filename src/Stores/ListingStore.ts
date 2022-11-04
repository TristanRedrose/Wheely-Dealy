import { makeObservable, observable, action } from "mobx";
import { CarListing, ListingData, PagingParams } from "../Types/listing.type";
import { Company } from "../Types/company.type";
import { Filter } from "../Types/filter.type";
import { companyList } from "./MockLists";
import { deleteListing, getListingDetails, getListingPage, postNewListing, updateListing } from "../Services/Listing.service";
import {toast} from "react-toastify";

export class ListingStore {

    listings: CarListing[] = [];

    companyList: Company[] = companyList;

    page: number = 1;

    filter: Filter = {
        company: null,
        engine: null,
    }

    sorting: string | null = null;

    maxPages: number = 0;

    isLoading: boolean = false;

    isCancelled: boolean = false;

    

    listing: CarListing | undefined = undefined;

    message: string = '';

    actionSuccess: boolean = false;

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
            actionSuccess: observable,
            setSuccess:action,
            setMakeFilter: action,
            setEngineFilter: action,
            setHorsepowerSorting: action,
            setPriceSorting: action,
            incrementPage: action,
            decrementPage: action,
            setPage: action,
            setListings: action,
            setMaxPages: action,
            clearListingsPage: action,
            setLoadingStatus: action,
            setCancelStatus: action,
            setMessage: action,
            setListing: action,
            listing: observable,
            getListing: action,
            deleteListing: action,
            notify: action,
            clearListingData: action,
        });
    }

    notify = () => toast(this.message, {
        position:'top-right',
        autoClose:1000,
        theme:'dark',
        }
    );

    clearListingsPage = (): void => {
        this.setCancelStatus(true);
        this.setLoadingStatus(false);
        this.setListings([]);
        this.setMaxPages(0);
        this.filter = {
            company: null,
            engine: null,
        }

        this.sorting = null
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
        const pagingParams: PagingParams = {
            page: this.page,
            filter: this.filter,
            sorting: this.sorting
        }
        await getListingPage(pagingParams).then((result) => {
            if (result === undefined) {
                list = [];
                return;
            }

            list = result.paginatedListings.listings;
            max = result.paginatedListings.maxPages;
        });
        if (this.isCancelled) {
            this.setCancelStatus(false);
            return;
        }
        this.setLoadingStatus(false);
        this.setListings(list);
        this.setMaxPages(max);
    }

    setMakeFilter = (event: React.FormEvent<HTMLSelectElement>): void =>  {
        this.page = 1;
        if (event.currentTarget.value === "M-N/A") {
            this.filter.company = null;
            this.getCurrentListing();
            return;
        }
        
        this.filter.company = event.currentTarget.value;
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
            this.sorting = null;
            this.getCurrentListing();
            return;
        }

        this.sorting= event.currentTarget.value;
        this.getCurrentListing();
    }

    setPriceSorting = (event: React.FormEvent<HTMLSelectElement>): void =>{
        this.page = 1;
        if (event.currentTarget.value === "none") {
            this.sorting = null;
            this.getCurrentListing();
            return;
        }

        this.sorting = event.currentTarget.value;

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

    addNewListing = async(newListing:ListingData): Promise<void> => {
        this.setLoadingStatus(true);
        const response = await postNewListing(newListing);
        
        this.setSuccess(response.isSuccessful);
        this.setMessage(response.message);
        this.setLoadingStatus(false);
    }

    setMessage = (message: string): void => {
        this.message = message;
    }

    setSuccess = (value: boolean): void => {
        this.actionSuccess = value;
    }

    setListing = (listing: CarListing | undefined): void => {
        this.listing = listing;
    }

    clearListingData = ():void => {
        this.setSuccess(false);
        this.setCancelStatus(true);
        this.setListing(undefined);
        this.setLoadingStatus(false);
    }

    getListing = async (id:string): Promise<void> => {
        this.setLoadingStatus(true)
        let listing = await getListingDetails(id);
        if (listing !== undefined) {
            this.setListing(listing);
        }
        this.setLoadingStatus(false);
    }

    deleteListing = async (id:string): Promise<void> => {
        this.setLoadingStatus(true);
        const deleteResponse = await deleteListing(id);
        this.setMessage(deleteResponse.message);
        this.setSuccess(deleteResponse.isSuccessful);
        this.setLoadingStatus(false);
    }

    updateListing = async(id:string, listingData:ListingData): Promise<void> => {
        this.setLoadingStatus(true);
        const response = await updateListing(listingData, id);
        this.setSuccess(response.isSuccessful);
        this.setMessage(response.message);
        this.setLoadingStatus(false);
    }
}

export const listingStore = new ListingStore();