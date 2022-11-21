import mongoose from "mongoose";
import UserModel from "../config/database/user.model";
import { User } from "../types/user.type";
import bcrypt from "bcrypt";

interface IUserStore {
    userExists: (username: string) => Promise<boolean>;
    addUser: (username:string, password:string, email:string) => Promise<User>;
    getUser: (username:string) => Promise<User | null>;
}
const model = UserModel;

class UserStore implements IUserStore {
    async userExists(username:string): Promise<boolean> {
        const name = username.trim()
        const userExists = await model.exists({username: name}).collation({ locale: 'en_US', strength: 1 });
        return userExists !== null;
    };

    async addUser(username:string, password:string, email:string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await model.create( 
            {
                username: username,
                password: hashedPassword,
                email: email,
            }
        );
        return user;
    };

    async getUser(username:string): Promise<User | null> {
        const name = username.trim();
        const user = await model.findOne({ username: name }).collation({ locale: 'en_US', strength: 1 });
        return user;
    }
}

export default new UserStore as IUserStore;