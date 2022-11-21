import { Document }  from "mongoose"

export default interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}