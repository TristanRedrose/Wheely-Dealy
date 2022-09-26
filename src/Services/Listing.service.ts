import { mockList } from "../Stores/MockLists";
import { Filter } from "../Types/filter.type";
import { CarListing } from "../Types/listing.type";
import { Response } from "../Types/response.type";
import { Sorting } from "../Types/sorting.types";

const delay = () => new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (1600) + 400)));

const filterList = (response: Response, filter:Filter): void => {
    if (filter.make) {
        response.listing = response.listing.filter(item => item.make === filter.make);
    }

    if (filter.engine) {
        response.listing = response.listing.filter(item => item.engine === filter.engine);
    }

    response.maxPages = Math.ceil(response.listing.length / 8);
}

const sortList = (response: Response, sorting:Sorting): void => {
    if (sorting.sortBy === "price") {
        if (sorting.order === "highest") {

            response.listing = [...response.listing].sort((listing1, listing2) => listing2.price - listing1.price);
            return;
        }

        response.listing = [...response.listing].sort((listing1, listing2) => listing1.price - listing2.price);
        return;
    }

    if (sorting.sortBy === "horsepower") {
        if (sorting.order === "highest") {

            response.listing = [...response.listing].sort((listing1, listing2) => listing2.horsepower - listing1.horsepower);
            return;
        }
    
        response.listing = [...response.listing].sort((listing1, listing2) => listing1.horsepower - listing2.horsepower);
    }
}


const paginate = (response: Response, page: number): void => {
    response.listing = response.listing.slice((page - 1) * 8, page * 8);   
}

export const getListingPage = async (filter: Filter, sorting: Sorting, page: number): Promise<Response |undefined> => {
    try {

        let res: Response = {
            listing: mockList,
            maxPages:Math.ceil(mockList.length / 8),
        };

        filterList(res, filter);

        sortList(res, sorting);

        paginate(res, page);

        await delay();
        return res;
    }
    catch(err) {
        console.log(err);
    }
}

export const postNewListing = async(object:CarListing): Promise<string | undefined> =>  {
    try {
        await delay();
        object.id = mockList.length + 1;
        mockList.push(object);
        return "Listing added";
    }
    catch(err) {
        return "Oops, something went wrong";
    }
}

export const getListingById = async(id:number): Promise<CarListing | undefined> => {
    try {
        await delay();
        let listing = mockList.filter(listing => listing.id === id)[0];
        return listing
    }
    catch (err) {
        console.log(err);
    }
}


