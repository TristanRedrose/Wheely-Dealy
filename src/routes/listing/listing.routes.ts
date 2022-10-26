import express, { Request } from "express";
import listingController from "../../controllers/listing.controller";
import { AuthorisedTypedRequestBody, TypedRequestQuery, AuthorisedTypedRequestQuery } from "../../types/shared.types";
import { body, validationResult } from "express-validator";
import { DeleteListing, ListingId, NewListing, NewListingData, PagingParams } from "../../types/listing.types";
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
    body('description').isLength({ min:1 }),
    body('company').isLength({ min:1 }),
    body('model').isLength({ min:1 }),
    body('engine').isLength({ min:1 }),
    (req:AuthorisedTypedRequestBody<NewListingData>, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newListing: NewListing = {
                username: decodeToken(req.body.token).username,
                listingData: req.body
            }
            return listingController.addListing(newListing, res);
        } catch (err) {
            console.log(err);
        }
    }
);

router.delete('/deleteListing', (req:AuthorisedTypedRequestQuery<ListingId>, res) => {
        try {
            const deleteListing: DeleteListing = {
                username: decodeToken(req.body.token).username,
                id: req.query.id,
            }
            return listingController.deleteListing(deleteListing, res);
        } catch (err) {
            console.log(err);
        }
    }
);

export default router;

