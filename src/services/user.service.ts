import userStore from "../stores/user.store";
import { User } from "../types/user.type";

interface IUserService {
    getAuthenticatedUser: (username:string, password:string) => Promise<User | null>,
    addUser: (username:string, password:string, email:string) => Promise<User | null>,
    checkUser: (username: string) => Promise<boolean>,
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

    async checkUser (username: string): Promise<boolean> {
        const userExists = await userStore.userExists(username);
        if (userExists) return true;
        return false;
    }
}

export default new UserService as IUserService;