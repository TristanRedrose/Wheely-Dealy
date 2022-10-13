import mongoose from "mongoose";
import UserModel from "../config/database/user.model";
import { User } from "../types/user.type";

interface IUserStore {
    userExists: (username: string) => Promise<boolean>;
    addUser: (username:string, password:string, email:string) => Promise<User>;
    getUser: (username:string) => Promise<User | null>;
}
const model = UserModel;

class UserStore implements IUserStore {
    async userExists(username:string): Promise<boolean> {
        const userExists = await model.exists({username: username})
        return userExists !== null;
    };

    async addUser(username:string, password:string, email:string): Promise<User> {
        const user = await model.create( 
            {
                username: username,
                password: password,
                email: email,
            }
        );
        return user;
    };

    async getUser(username:string): Promise<User | null> {
        const user = await model.findOne({ username: username })
        return user;
    }
}

export default new UserStore as IUserStore;