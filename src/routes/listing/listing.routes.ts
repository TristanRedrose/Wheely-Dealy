import express from "express";
import listingController from "../../controllers/listing.controller";
import { AuthorisedTypedRequestBody, TypedRequestQuery, AuthorisedTypedRequestQuery } from "../../types/shared.types";
import { body, validationResult } from "express-validator";
import { DeleteListing, ListingId, NewListing, NewListingData, PagingParams } from "../../types/listing.types";
import { verifyToken } from "../../middleware/verifyToken";
import { decodeToken } from "../../middleware/decodeToken";

const router = express.Router();

router.get('/get', async(req: TypedRequestQuery<PagingParams>, res, next) => {
    return await listingController.getListings(req.query, res);
});

router.get("/listing/get", async(req:TypedRequestQuery<ListingId>, res, next) => {
    return await listingController.getListing(req.query, res);
});

router.use(verifyToken);

router.post('/post',
    body('description').isLength({ min:1 }),
    body('company').isLength({ min:1 }),
    body('model').isLength({ min:1 }),
    body('engine').isLength({ min:1 }),
    async (req:AuthorisedTypedRequestBody<NewListingData>, res, next) => {
        
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newListing: NewListing = {
        username: decodeToken(req.body.token).username,
        listingData: req.body
    }
    return await listingController.addListing(newListing, res);
});

router.delete('/delete', async(req:AuthorisedTypedRequestQuery<ListingId>, res, next) => {
    const deleteListing: DeleteListing = {
        username: decodeToken(req.body.token).username,
        id: req.query.id,
    }
    return await listingController.deleteListing(deleteListing, res);
});

export default router;

