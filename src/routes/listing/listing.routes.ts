import express, { Request } from "express";
import listingController from "../../controllers/listing.controller";
import { AuthorisedTypedRequestBody, TypedRequestQuery, AuthorisedTypedRequestParams } from "../../types/shared.types";
import { body, validationResult } from "express-validator";
import { DeleteListing, ListingId, NewListing, NewListingData, PagingParams } from "../../types/listing.types";
import { verifyToken } from "../../middleware/verifyToken";
import { decodeToken } from "../../middleware/decodeToken";

const router = express.Router();

router.get('/', async(req: TypedRequestQuery<PagingParams>, res, next) => {
    return await listingController.getListings(req.query, res);
});

router.get("/:id", async(req:Request<ListingId>, res, next) => {
    return await listingController.getListing(req.params, res);
});

router.use(verifyToken);

router.post('/',
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

router.delete('/:id', async(req:AuthorisedTypedRequestParams<ListingId>, res, next) => {
    const deleteListing: DeleteListing = {
        username: decodeToken(req.body.token).username,
        id: req.params.id,
    }
    return await listingController.deleteListing(deleteListing, res);
});

export default router;

