import { LoginRequest, RegisterRequest } from "../types/auth.types";
import { Response } from "express";
import userService from "../services/user.service";
import { UserName } from "../types/shared.types";


interface IAuthController {
    login: (req:LoginRequest, res:Response) => Promise<Response>,
    register: (req:RegisterRequest, res:Response) => Promise<Response>,
    userExists: (req: UserName, res: Response) => Promise<Response>,
}


class AuthController implements IAuthController {
    async login(req:LoginRequest, res:Response): Promise<Response> {
        const user = await userService.getAuthenticatedUser(req.username, req.password);
        if (user) {
            const loginResponse = await userService.getLoginResponse(user, "Login successful");
            return res.status(200).json({ session: loginResponse });
        }

        return res.status(400).json({ message: 'Invalid username/password' });
    }

    async register(req:RegisterRequest, res:Response): Promise<Response> {
        const newUser = await userService.addUser(req.username, req.password, req.email);
        if (newUser) {
            const loginResponse = await userService.getLoginResponse(newUser, "Registration successful");
            return res.status(200).json({ session: loginResponse });
        }
        
        return res.status(400).json({ message: 'User already exists' });  
    }

    async userExists(req:UserName, res:Response): Promise<Response> {
        const userExists = await userService.userExists(req.username);
        return res.status(200).json({ userExists: userExists });
    }
}

export default new AuthController as IAuthController;