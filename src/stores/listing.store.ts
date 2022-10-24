import mongoose, {Types} from "mongoose";
import ListingModel from "../config/database/listing.model";
import UserModel from "../config/database/user.model";
import { PaginatedListings, NewListing, PagingParams, Listing } from "../types/listing.types";
import { Options } from "../types/shared.types";

const listingModel = ListingModel;
const userModel = UserModel;

interface IListingStore {
    getListings: (pagingParams:PagingParams) => Promise<PaginatedListings>;
    addListing: (newListing:NewListing) => Promise<string>;
    getListing: (id:string) => Promise<Listing | null>;
}

class ListingStore implements IListingStore {
    async getListings(pagingParams:PagingParams): Promise<PaginatedListings> {
        const sort: string = pagingParams.sorting ? pagingParams.sorting : '';
        const options: Options = {
            page: pagingParams.page,
            limit: 8,
            collation: {locale: 'en_US', strength: 1},
            populate: {path: 'listedBy', select: 'username'},
            sort: sort,
        }

        let paginatedListings:PaginatedListings = {
            listings: {} as Listing[],
            maxPages: 0,
            documentCount: 0,
        }
        await listingModel.paginate(pagingParams.filter, options, (err, results) => {
            paginatedListings = {
                listings: results.docs,
                maxPages: results.totalPages,
                documentCount: results.totalDocs,
            }
        });

        return paginatedListings;
    }

    async addListing(newListing:NewListing): Promise<string> {
        const {username, listingData: {description,company,model,engine,horsepower,price, image}} = newListing;
        
        const userId = await userModel.findOne({username: username}, '_id').collation({ locale: 'en_US', strength: 1 });
        if (userId) {
            const id:Types.ObjectId = userId._id;
            await listingModel.create(
                {
                    listedBy: id,
                    description: description,
                    company: company,
                    model: model,
                    engine: engine,
                    horsepower: horsepower,
                    price:price,
                    image:image,
                }
            )
            return "Listing added";
        }
        return "An error occured";
    }

    async getListing(id:string): Promise<Listing | null> {
        return await listingModel.findById(id);
    }
}

export default new ListingStore as IListingStore;

