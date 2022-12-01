import { makeObservable, observable, action } from "mobx";
import { CarListing, PagingParams } from "../../Types/listing.type";
import { Company } from "../../Types/company.type";
import { companyList } from "../MockLists";
import { getListingPage} from "../../Services/Listing.service";

export class ListingsPageStore {
    listings: CarListing[] = [];

    companyList: Company[] = companyList;

    sortKeys: string[] = ["price", "-price", "horsepower", "-horsepower"]

    engineFilterKeys: string[] = ["petrol", "diesel"];

    companyFilterKeys: string[] = companyList.map(item => item.company);

    maxPages: number = 0;

    isLoading: boolean = false;

    isCancelled: boolean = false;

    queryParams: PagingParams = {
        page: 1,
        sorting: null,
        filter: {
            company: null,
            engine: null,
        }
    };

    constructor() {
        makeObservable(this, {
            listings: observable,
            companyList: observable,
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
            serializeQueryParams: action,
            queryParams: observable,
            getListings: action,
            resetQueryParams: action,
            goToFirstPage: action,
        })
    }

    clearListingsPage = (): void => {
        this.setCancelStatus(true);
        this.setLoadingStatus(false);
        this.setListings([]);
        this.setMaxPages(0);
        this.resetQueryParams();
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
        const listingsResult = await getListingPage(this.queryParams);
        if (this.isCancelled) {
            this.setCancelStatus(false);
            return;
        }
        this.setLoadingStatus(false);
        this.setListings(listingsResult.paginatedListings.listings);
        this.setMaxPages(listingsResult.paginatedListings.maxPages);

        if (this.maxPages < this.queryParams.page) {
            this.setPage(`${this.maxPages}`);
        }
    }

    setMakeFilter = (filter: string): void =>  {
        this.companyFilterKeys.includes(filter) ? this.queryParams.filter.company = filter : this.queryParams.filter.company = null;
    }

    setEngineFilter = (filter: string): void =>  {
        this.engineFilterKeys.includes(filter) ? this.queryParams.filter.engine = filter : this.queryParams.filter.engine = null;
    }

    setSorting = (sorting: string): void => {
        this.sortKeys.includes(sorting) ? this.queryParams.sorting = sorting : this.queryParams.sorting = null;
    }

    setPage = (queryPage: string): void => {
        (+queryPage > 0) ? this.queryParams.page = +queryPage : this.queryParams.page = 1;
    }

    goToFirstPage = (): void => {
        if (this.queryParams.page !== 1) this.setPage('1');
    }

    serializeQueryParams = (): string => {
        const {page, sorting, filter: {company, engine}} = this.queryParams
        let queryParams = ''

        if (page) {
            const pageQuery = `&page=${page}`;
            queryParams = queryParams + pageQuery;
        }
        
        if (sorting) {
            const sortQuery = `&sort=${sorting}`;
            queryParams = queryParams + sortQuery;
        }

        if (company) {
            const makeQuery = `&make=${company}`;
            queryParams = queryParams + makeQuery;
        }

        if (engine) {
            const engineQuery = `&engine=${engine}`;
            queryParams = queryParams + engineQuery;
        }

        return queryParams
    }

    resetQueryParams = (): void => {
        this.queryParams = {
            page: 1,
            sorting: null,
            filter: {
                company: null,
                engine: null,
            }
        };
    }
}