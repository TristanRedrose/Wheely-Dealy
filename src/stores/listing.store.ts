import mongoose, {Types} from "mongoose";
import ListingModel from "../config/database/listing.model";
import UserModel from "../config/database/user.model";
import { PaginatedListings, NewListing, PagingParams, Listing, PopulatedListing, NewListingData } from "../types/listing.types";
import { Options } from "../types/shared.types";

const listingModel = ListingModel;
const userModel = UserModel;

interface IListingStore {
    getListings: (pagingParams:PagingParams) => Promise<PaginatedListings>;
    addListing: (username:string, listingData: NewListingData) => Promise<string>;
    getListing: (id:string) => Promise<Listing | null>;
    deleteListing: (id:string, username:string) => Promise<string>;
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
            listings: [],
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

    async addListing(username:string, listingData: NewListingData): Promise<string> {
        const {description, company, model, engine, horsepower, price, image} = listingData;
        
        const user = await userModel.findOne({username: username}, '_id').collation({ locale: 'en_US', strength: 1 });
        if (user) {
            const id:Types.ObjectId = user._id;
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
        return "Something went wrong";
    }

    async getListing(id:string): Promise<Listing | null> {
        try {
            return await listingModel.findById(id).populate('listedBy', 'username');
        } catch (error) {
            return null;
        }
    }

    async deleteListing(id:string, username:string): Promise<string> {
        const listing = await listingModel.findById(id).populate('listedBy', 'username') as PopulatedListing;
        if (!listing) return "Listing not found";
        if (listing.listedBy.username.toLowerCase() !== username.toLowerCase()) {
            return "Access denied"
        }

        await listingModel.deleteOne({_id: id});
        return "Listing removed";
    }
}

export default new ListingStore as IListingStore;

