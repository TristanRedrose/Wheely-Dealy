import express, { Request } from "express";
import listingController from "../../controllers/listing.controller";
import { TypedRequestBody, TypedRequestQuery } from "../../types/shared.types";
import { body, validationResult } from "express-validator";
import { DeleteListingReq, DeleteListing, ListingId, NewListing, NewListingReq, PagingParams } from "../../types/listing.types";
import { verifyToken } from "../../middleware/verifyToken";
import { decodeToken } from "../../middleware/decodeToken";

const router = express.Router();

router.get('/getListings', (req: TypedRequestQuery<PagingParams>, res) => {
    try {
        return listingController.getListings(req.query, res);
    } catch (err) {
        console.log(err);
    }
});

router.get("/getListing", (req:TypedRequestQuery<ListingId>, res) => {
    try {
        return listingController.getListing(req.query, res);
    } catch (err) {
        console.log(err);
    }
});

router.use(verifyToken);

router.post('/addListing', 
    body('token').isLength({ min:1 }),
    body('listingData.description').isLength({ min:1 }),
    body('listingData.company').isLength({ min:1 }),
    body('listingData.model').isLength({ min:1 }),
    body('listingData.engine').isLength({ min:1 }),
    (req:TypedRequestBody<NewListingReq>, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newListing: NewListing = {
                username: decodeToken(req.body.token).username,
                listingData: req.body.listingData
            }
            return listingController.addListing(newListing, res);
        } catch (err) {
            console.log(err);
        }
    }
);

router.delete('/deleteListing', 
    body('token').isLength({ min:1 }),
    body('id').isLength({ min:1 }),
    (req:TypedRequestBody<DeleteListingReq>, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const deleteListing: DeleteListing = {
                username: decodeToken(req.body.token).username,
                id: req.body.id
            }
            return listingController.deleteListing(deleteListing, res);
        } catch (err) {
            console.log(err);
        }
    }
);

export default router;

