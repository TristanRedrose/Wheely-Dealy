import express from "express";
import listingController from "../../controllers/listing.controller";
import { TypedRequestBody } from "../../types/shared.types";
import { body, validationResult } from "express-validator";
import { NewListing } from "../../types/listing.types";

const router = express.Router();

router.get('/getListings', (req:TypedRequestBody<void>, res) => {
    try {
        return listingController.getListings(req.body, res);
    } catch (err) {
        console.log(err);
    }
})

router.post('addListing', 
    body('username').isLength({ min:1 }),
    body('description').isLength({ min:1 }),
    body('company').isLength({ min:1 }),
    body('model').isLength({ min:1 }),
    body('engine').isLength({ min:1 }),
    (req:TypedRequestBody<NewListing>, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            return listingController.addListing(req.body, res);
        } catch (err) {
            console.log(err);
        }
    }
)

export default router;

