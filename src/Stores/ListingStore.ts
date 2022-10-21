import { makeObservable, observable, action } from "mobx";
import { CarListing, NewListingData, NewListingReq } from "../Types/listing.type";
import { Company } from "../Types/company.type";
import { Filter } from "../Types/filter.type";
import { Sorting } from "../Types/sorting.types";
import { companyList } from "./MockLists";
import { getListingById, getListingPage, postNewListing } from "../Services/Listing.service";
import { Session } from "../Types/auth.types";

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
            getListing: action,
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

    getListing = async(id:number): Promise<void> => {
        this.setLoadingStatus(true);
        await getListingById(id).then(result => {
            this.setListing(result);
        });
        if (this.isCancelled) {
            this.setCancelStatus(false);
            return;
        }
        this.setLoadingStatus(false);
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