import mongoose, {Types} from "mongoose";
import ListingModel from "../config/database/listing.model";
import UserModel from "../config/database/user.model";
import { Listing, NewListing } from "../types/listing.types";
import { Options } from "../types/shared.types";

const listingModel = ListingModel;
const userModel = UserModel;

interface IListingStore {
    getListings: (page:number) => Promise<Listing[]>;
    addListing: (newListing:NewListing) => Promise<string>;
}

class ListingStore implements IListingStore {
    async getListings(page:number): Promise<Listing[]> {
        const options: Options = {
            page: page,
            limit: 8,
            collation: {locale: 'en_US', strength: 1},
            populate: {path: 'listedBy', select: 'username'},
        }
        let result: Listing[] = {} as Listing[];
        await listingModel.paginate({}, options, (err, results) => {
            result = results.docs;
        })

        return result;
    }

    async addListing(newListing:NewListing): Promise<string> {
        const {username, listingData: {description,company,model,engine,horsepower,price, image}} = newListing;
        const userId = await userModel.findOne({username: username}, '_id').collation({ locale: 'en_US', strength: 1 });
        if (userId) {
            const id:Types.ObjectId = userId._id;
            const listing = await listingModel.create(
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
            console.log(listing);
            return "Listing added";
        }
        return "An error occured";
    }
}

export default new ListingStore as IListingStore;

