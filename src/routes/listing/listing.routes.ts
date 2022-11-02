import express, { Request } from "express";
import listingController from "../../controllers/listing.controller";
import { TypedRequestQuery, AuthenticatedRequest} from "../../types/shared.types";
import { body, validationResult } from "express-validator";
import { ListingId, NewListingData, PagingParams } from "../../types/listing.types";
import { verifyToken } from "../../middleware/verifyToken";

const router = express.Router();

router.get('/', async(req: TypedRequestQuery<PagingParams>, res, next) => {
    try {
        return await listingController.getListings(req, res);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async(req:Request<ListingId>, res, next) => {
    try {
        return await listingController.getListing(req, res);
    } catch (error) {
        next(error)
    }
});

router.use(verifyToken);

router.post('/',
    body('description').isLength({ min:1 }),
    body('company').isLength({ min:1 }),
    body('model').isLength({ min:1 }),
    body('engine').isLength({ min:1 }),
    async (req:AuthenticatedRequest<NewListingData>, res, next) => {
        
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        return await listingController.addListing(req, res);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async(req:AuthenticatedRequest<void>, res, next) => {
    try {
        return await listingController.deleteListing(req, res);
    } catch (error) {
        next(error);  
    }
});

export default router;

