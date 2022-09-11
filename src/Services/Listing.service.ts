import { mockList } from "../Stores/MockLists";
import { Filter } from "../Types/filter.type";
import { CarListing } from "../Types/listing.type";
import { Sorting } from "../Types/sorting.types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const filterList = (response: Response, filter:Filter) => {
    if (filter.make) {
        response.listing = response.listing.filter(item => item.make === filter.make);
    }

    if (filter.engine) {
        response.listing = response.listing.filter(item => item.engine === filter.engine);
    }

    response.maxPages = Math.ceil(response.listing.length / 8);
}

const sortList = (response: Response, sorting:Sorting) => {
    if (sorting.sortBy === "price") {
        if (sorting.order === "highest") {

            response.listing = [...response.listing].sort(function(listing1, listing2){return listing2.price - listing1.price});
            return;
        }

        response.listing = [...response.listing].sort(function(listing1, listing2){return listing1.price - listing2.price});
        return;
    }

    if (sorting.order === "highest") {

        response.listing = [...response.listing].sort(function(listing1, listing2){return listing2.horsepower - listing1.horsepower});
        return;
    }

    response.listing = [...response.listing].sort(function(listing1, listing2){return listing1.horsepower - listing2.horsepower});
}


const paginate = (response: Response, page: number) => {
    response.listing = response.listing.slice((page - 1) * 8, page * 8);
}

interface Response {
    listing: CarListing[],
    maxPages: number,
}

export const getListingPage = async (filter: Filter, sorting: Sorting, page: number) => {
    try {

        let res: Response = {
            listing: mockList,
            maxPages:Math.ceil(mockList.length / 8),
        };

        filterList(res, filter);

        sortList(res, sorting);

        paginate(res, page);

        await delay(2000);
        return res;
    }
    catch(err) {
        console.log(err);
    }
}


