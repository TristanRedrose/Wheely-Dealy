import { makeObservable, observable, action } from "mobx";
import { CarListing, NewListingData, NewListingReq, PagingParams } from "../Types/listing.type";
import { Company } from "../Types/company.type";
import { Filter } from "../Types/filter.type";
import { companyList } from "./MockLists";
import { getListingPage, postNewListing } from "../Services/Listing.service";
import { Session } from "../Types/auth.types";

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

    newListing: NewListingData = {
        description:"",
        company: "",
        model: "",
        price: 0,
        horsepower: 0,
        image: "",
        engine: "",
    }

    listing: CarListing | undefined = undefined;

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
            setRedirect:action,
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
            setListing: action,
            listing:observable,
        });
    }

    clearListings = (): void => {
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
            this.getCurrentListing();
            this.sorting = null;
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

    setNewListingValue = (event: React.FormEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>): void => {
        const name = event.currentTarget.name
        const value = event.currentTarget.value
        this.setMessage('');

        switch (name) {
            case "company":
                this.newListing.company = value;
                break;
            case "price":
                this.newListing.price = +value;
                break;
            case "horsepower":
                this.newListing.horsepower = +value;
                break;
            case "type":
                this.newListing.model = value;
                break;
            case "image":
                this.newListing.image = value;
                break;
            case "engine":
                this.newListing.engine = value;
                break;
            case "description":
                this.newListing.description = value;
                break;
        }  
    }

    addNewListing = async(): Promise<void> => {
        const checkPassed = this.checkNewListValue();
        if (!checkPassed) {
            return;
        }
        const token = this.getToken();
        if (token) {
            this.setLoadingStatus(true);
            const newListingReq:NewListingReq = {
                token: token,
                listingData:this.newListing
            }
            const response = await postNewListing(newListingReq);

            this.setMessage(response.message);
        }
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
            description: "",
            company: "",
            model: "",
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

    setListing = (listing: CarListing | undefined): void => {
        this.listing = listing;
    }

    clearListing = ():void => {
        this.setCancelStatus(true);
        this.setListing(undefined);
        this.setLoadingStatus(false);
    }

    getToken = (): string | null => {
        let token: (string | null) = null
        const currentSession = localStorage.getItem("CurrentSession");
        if (currentSession) {
            const session: Session = JSON.parse(currentSession);
            token = session.token;
        }
        return token
    }

}

export const listingStore = new ListingStore();