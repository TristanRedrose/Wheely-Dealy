import express from "express";
import { LoginRequest, RegisterRequest } from "../../types/auth.types";
import { TypedRequestBody, UserName } from "../../types/shared.types";
import { body, validationResult } from "express-validator";
import authController from "../../controllers/auth.controller";

const router = express.Router();


router.post('/register', 
    body('username').isLength({ min:1 }),
    body('password').isLength({ min:1 }),
    body('email').isLength({ min:1 }).isEmail(),
    (req: TypedRequestBody<RegisterRequest>, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            return authController.register(req.body, res);
        } catch (err) {
            console.log(err);
        }
    }
)

router.post('/login',
    body('username').isLength({ min:1 }),
    body('password').isLength({ min:1 }),  
    async(req: TypedRequestBody<LoginRequest>, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            return authController.login(req.body, res);
        } catch (err) {
            next(err);
        }
    }
)

router.post('/checkUser',
    body('username').isLength({ min:1 }),
    async (req:TypedRequestBody<UserName>, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            return authController.userExists(req.body, res);
        } catch(err) {
            next(err);
        }
    }
)

export default router;