import listingService from "../services/listing.service";
import express, { Request, Response } from "express";
import { ListingId, NewListingData, PagingParams} from "../types/listing.types";
import { AuthorisedTypedRequestBody, AuthorisedTypedRequestParams, TypedRequestQuery } from "../types/shared.types";
import { getTokenPayload } from "../helpers/getTokenPayload";



interface IListingController {
    addListing:(req:AuthorisedTypedRequestBody<NewListingData>, res:Response) => Promise<Response>;
    getListings:(req:TypedRequestQuery<PagingParams>, res:Response) => Promise<Response>;
    getListing:(req:Request<ListingId>, res:Response) => Promise<Response>;
    deleteListing:(req:AuthorisedTypedRequestParams<ListingId>, res:Response) => Promise<Response>;
}

class ListingController implements IListingController {
    async addListing(req:AuthorisedTypedRequestBody<NewListingData>, res:Response): Promise<Response> {
        const user = getTokenPayload(req.body.token)

        const response = await listingService.addListing(user.username, req.body);

        if (response) return res.status(201).json({message: "Listing added"});

        return res.status(400).json('Listing post failed');
    }

    async getListings(req:TypedRequestQuery<PagingParams>, res:Response): Promise<Response> {
        const response = await listingService.getListings(req.query);

        if (response) return res.status(200).json({paginatedListings: response});

        return res.status(400).json('Listing retrieval error');
    }

    async getListing(req:Request<ListingId>, res:Response): Promise<Response> {
        const listing = await listingService.getListing(req.params.id);
        
        if (listing) return res.status(200).json(listing);

        return res.status(400).json('Listing retrieval error');
    }

    async deleteListing(req:AuthorisedTypedRequestParams<ListingId>, res:Response): Promise<Response> {
        const user = getTokenPayload(req.body.token)

        const deleteResponse = await listingService.deleteListing(req.params.id, user.username);

        if (deleteResponse) return res.sendStatus(204);

        return res.status(400).json('Something went wrong during listing deletion');
    }
}

export default new ListingController as IListingController;