import listingService from "../services/listing.service";
import express, { Response } from "express";
import { ListingId, NewListing, PagingParams} from "../types/listing.types";


interface IListingController {
    addListing:(req:NewListing, res:Response) => Promise<Response>;
    getListings:(req:PagingParams, res:Response) => Promise<Response>;
    getListing:(req:ListingId, res:Response) => Promise<Response>;
}

class ListingController implements IListingController {
    async addListing(req:NewListing, res:Response): Promise<Response> {
        const response = await listingService.addListing(req);

        if (response === "Listing added") return res.json({message: response});

        return res.status(400).json({message: response});
    }

    async getListings(req:PagingParams, res:Response): Promise<Response> {
        const response = await listingService.getListings(req);

        if (response) return res.json({paginatedListings: response});

        return res.status(400).json({message: "Listing retrieval error"});
    }

    async getListing(req:ListingId, res:Response): Promise<Response> {
        const listing = await listingService.getListing(req.id);
        
        if (listing) return res.json(listing);

        return res.status(400).json({message: "Listing retrieval error"});
    }
}

export default new ListingController as IListingController;