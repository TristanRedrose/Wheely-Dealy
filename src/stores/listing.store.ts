import mongoose, {Types} from "mongoose";
import ListingModel from "../config/database/listing.model";
import UserModel from "../config/database/user.model";
import { Listing, NewListing } from "../types/listing.types";

const listingModel = ListingModel;
const userModel = UserModel;

interface IListingStore {
    getListings: () => Promise<Listing[]>;
    addListing: (newListing:NewListing) => Promise<string>;
}

class ListingStore implements IListingStore {
    async getListings(): Promise<Listing[]> {
        return await listingModel.find({}).populate('listedBy', 'username');
    }

    async addListing(newListing:NewListing): Promise<string> {
        const {username,description,company,model,engine,horsepower,price} = newListing;
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
                }
            )
            return "Listing added";
        }
        return "An error occured";
    }
}

export default new ListingStore as IListingStore;

