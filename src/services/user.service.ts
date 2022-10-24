import userStore from "../stores/user.store";
import { User } from "../types/user.type";
import jwt from "jsonwebtoken";
import { secretKey } from "../env/env";
import { SessionData } from "../types/shared.types";

interface IUserService {
    getAuthenticatedUser: (username:string, password:string) => Promise<User | null>,
    addUser: (username:string, password:string, email:string) => Promise<User | null>,
    checkUser: (username: string) => Promise<boolean>,
    loginResponse: ( user: User, message: string) => Promise<SessionData>,
}

class UserService implements IUserService {
    async getAuthenticatedUser(username: string, password: string): Promise<User | null> {
        const user = await userStore.getUser(username);
        if (user && user.password === password) return user;

        return null;
    }

    async addUser(username:string, password:string, email:string): Promise<User | null> {
        const userExists = await userStore.userExists(username);
        if (userExists) return null;
        
        const user = await userStore.addUser(username, password, email);
        return user;
    }

    async checkUser(username: string): Promise<boolean> {
        const userExists = await userStore.userExists(username);
        if (userExists) return true;
        return false;
    }

    async loginResponse(user:User, message: string): Promise<SessionData> {
        const token = jwt.sign({ user: user }, secretKey, {expiresIn: '60m'});
        const exp: number = Math.floor(Date.now() / 1000) + (60 * 60);
        return {
            message: message,
            token: token,
            exp: exp,
        }
    }
}

export default new UserService as IUserService;