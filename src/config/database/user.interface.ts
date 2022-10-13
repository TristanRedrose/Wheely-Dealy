import { Document }  from "mongoose"

export default interface IUser extends Document {
    username: string;
    password: String;
    email: String;
    createdAt: Date;
    updatedAt: Date;
}