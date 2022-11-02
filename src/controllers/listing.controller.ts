import listingService from "../services/listing.service";
import express, { Request, Response } from "express";
import { ListingId, ListingUpdateData, NewListingData, PagingParams} from "../types/listing.types";
import { AuthenticatedRequest, TypedRequestQuery } from "../types/shared.types";



interface IListingController {
    addListing:(req:AuthenticatedRequest<NewListingData>, res:Response) => Promise<Response>;
    getListings:(req:TypedRequestQuery<PagingParams>, res:Response) => Promise<Response>;
    getListing:(req:Request<ListingId>, res:Response) => Promise<Response>;
    deleteListing:(req:AuthenticatedRequest<void>, res:Response) => Promise<Response>;
    updateListing:(req: AuthenticatedRequest<ListingUpdateData>, res:Response) => Promise<Response>;
}

class ListingController implements IListingController {
    async addListing(req:AuthenticatedRequest<NewListingData>, res:Response): Promise<Response> {

        const response = await listingService.addListing(req.username!, req.body);

        if (response) return res.status(201).json({message: "Listing added"});

        return res.status(400).json({message: 'Listing post failed'});
    }

    async getListings(req:TypedRequestQuery<PagingParams>, res:Response): Promise<Response> {
        const response = await listingService.getListings(req.query);

        if (response) return res.status(200).json({paginatedListings: response});

        return res.status(400).json({message: 'Listing retrieval error'});
    }

    async getListing(req:Request<ListingId>, res:Response): Promise<Response> {
        const listing = await listingService.getListing(req.params.id);
        
        if (listing) return res.status(200).json(listing);

        return res.status(400).json({message: 'Listing retrieval error'});
    }

    async deleteListing(req:AuthenticatedRequest<void>, res:Response): Promise<Response> {

        const deleteResponse = await listingService.deleteListing(req.params!.id, req.username!);

        if (deleteResponse) return res.sendStatus(204);

        return res.status(400).json({message: 'Something went wrong during listing deletion'});
    }
    
    async updateListing(req:AuthenticatedRequest<ListingUpdateData>, res:Response): Promise<Response> {
        const updateResponse = await listingService.updateListing(req.params!.id, req.body, req.username!);

        if (updateResponse) return res.status(200).json('Listing updated');

        return res.status(400).json({message: 'Something went wrong during listing update'});
    }
}

export default new ListingController as IListingController;