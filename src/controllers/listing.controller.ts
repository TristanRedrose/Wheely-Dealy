import ListingService from "../services/listing.service";
import express, { Response } from "express";
import { NewListing} from "../types/listing.types";
import { decodeToken } from "../middleware/decodeToken";


interface IListingController {
    addListing:(req:NewListing, res:Response) => Promise<Response>;
    getListings:(req:number, res:Response) => Promise<Response>;
}

class ListingController implements IListingController {
    async addListing(req:NewListing, res:Response): Promise<Response> {
        const response = await ListingService.addListing(req);

        if (response === "Listing added") return res.json({message: response});

        return res.status(400).json({message: response});
    }

    async getListings(req:number, res:Response):Promise<Response> {
        const response = await ListingService.getListings(req);

        if (response) return res.json({listings: response});

        return res.status(400).json({message: "Listing retrieval error"});
    }
}

export default new ListingController as IListingController;