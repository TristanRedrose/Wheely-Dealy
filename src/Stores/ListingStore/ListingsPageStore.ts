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
            setSorting: action,
            setPage: action,
            setListings: action,
            setMaxPages: action,
            clearListingsPage: action,
            setLoadingStatus: action,
            setCancelStatus: action,
            getQueryParams: action,
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
        this.setPage(1);
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

    setMakeFilter = (filter: string): void =>  {
        this.setPage(1);
        if (filter === "all") {
            this.filter.company = null;
            this.getCurrentListing();
            return;
        }
        
        this.filter.company = filter;
        this.getCurrentListing();
    }

    setEngineFilter = (filter: string): void =>  {
        this.setPage(1);
        if (filter === "all") {
            this.filter.engine = null;
            this.getCurrentListing();
            return;
        } 
        
        this.filter.engine = filter;
        this.getCurrentListing();
    }

    setSorting = (sorting: string): void =>{
        this.setPage(1);
        if (sorting === "none") {
            this.sorting = null;
            this.getCurrentListing();
            return;
        }

        this.sorting = sorting;

        this.getCurrentListing();
    }

    setPage = (page:number): void => {
        this.page = page;
    }

    getQueryParams = (page: number, sort: string | null, make:string | null, engine:string | null): string => {
        let queryParams = `page=${page}`;
        
        if (sort) {
            let sortQuery = `&sort=${sort}`;
            queryParams = queryParams + sortQuery;
        }

        if (make) {
            let makeQuery = `&make=${make}`;
            queryParams = queryParams + makeQuery;
        }

        if (engine) {
            let engineQuery = `&engine=${engine}`;
            queryParams = queryParams + engineQuery;
        }

        return queryParams
    }
}