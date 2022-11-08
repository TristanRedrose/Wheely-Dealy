import { makeObservable, observable, action } from "mobx";
import { CarListing, PagingParams } from "../../Types/listing.type";
import { Company } from "../../Types/company.type";
import { Filter } from "../../Types/filter.type";
import { companyList } from "../MockLists";
import { getListingPage} from "../../Services/Listing.service";



export class ListingsPageStore {
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
            clearListingsPage: action,
            setLoadingStatus: action,
            setCancelStatus: action,
        })
    }

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
}