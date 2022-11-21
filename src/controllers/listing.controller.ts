import listingService from "../services/listing.service";
import express, { Request, Response } from "express";
import { ListingId, NewListingData, PagingParams} from "../types/listing.types";
import { AuthenticatedRequest, TypedRequestQuery } from "../types/shared.types";



interface IListingController {
    addListing:(req:AuthenticatedRequest<NewListingData>, res:Response) => Promise<Response>;
    getListings:(req:TypedRequestQuery<PagingParams>, res:Response) => Promise<Response>;
    getListing:(req:Request<ListingId>, res:Response) => Promise<Response>;
    deleteListing:(req:AuthenticatedRequest<void>, res:Response) => Promise<Response>;
    updateListing:(req: AuthenticatedRequest<NewListingData>, res:Response) => Promise<Response>;
}

class ListingController implements IListingController {
    async addListing(req:AuthenticatedRequest<NewListingData>, res:Response): Promise<Response> {

        const listingAdded = await listingService.addListing(req.username!, req.body);

        if (listingAdded) return res.status(201).json({message: "Listing added"});

        return res.status(400).json({message: 'Listing post failed'});
    }

    async getListings(req:TypedRequestQuery<PagingParams>, res:Response): Promise<Response> {
        const listings = await listingService.getListings(req.query);

        if (listings) return res.status(200).json({paginatedListings: listings});

        return res.status(400).json({message: 'Listing retrieval error'});
    }

    async getListing(req:Request<ListingId>, res:Response): Promise<Response> {
        const listing = await listingService.getListing(req.params.id);
        
        if (listing) return res.status(200).json(listing);

        return res.status(400).json({message: 'Listing retrieval error'});
    }

    async deleteListing(req:AuthenticatedRequest<void>, res:Response): Promise<Response> {

        const listingDeleted = await listingService.deleteListing(req.params!.id, req.username!);

        if (listingDeleted) return res.sendStatus(204);

        return res.status(400).json({message: 'Something went wrong during listing deletion'});
    }
    
    async updateListing(req:AuthenticatedRequest<NewListingData>, res:Response): Promise<Response> {
        const listingUpdated = await listingService.updateListing(req.params!.id, req.body, req.username!);

        if (listingUpdated) return res.status(200).json({message: 'Listing updated'});

        return res.status(400).json({message: 'Something went wrong during listing update'});
    }
}

export default new ListingController as IListingController;