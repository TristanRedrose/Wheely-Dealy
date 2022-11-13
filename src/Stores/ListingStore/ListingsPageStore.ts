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

    sortKeys: string[] = ["price", "-price", "horsepower", "-horsepower"]

    engineFilterKeys: string[] = ["petrol", "diesel"];

    companyFilterKeys: string[] = companyList.map(item => item.company);

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

    getListings = async(): Promise<void> =>{
        this.setLoadingStatus(true);
        const pagingParams: PagingParams = {
            page: this.page,
            filter: this.filter,
            sorting: this.sorting
        }
        const listingsResult = await getListingPage(pagingParams);

        if (this.isCancelled) {
            this.setCancelStatus(false);
            return;
        }
        this.setLoadingStatus(false);
        this.setListings(listingsResult.paginatedListings.listings);
        this.setMaxPages(listingsResult.paginatedListings.maxPages);
    }

    setMakeFilter = (filter: string): void =>  {
        this.companyFilterKeys.includes(filter) ? this.filter.company = filter : this.filter.company = null;
    }

    setEngineFilter = (filter: string): void =>  {
        this.engineFilterKeys.includes(filter) ? this.filter.engine = filter : this.filter.engine = null;
    }

    setSorting = (sorting: string): void =>{
        this.sortKeys.includes(sorting) ? this.sorting = sorting : this.sorting = null;
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