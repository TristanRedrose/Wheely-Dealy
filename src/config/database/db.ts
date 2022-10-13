import mongoose from "mongoose";

const initialiseMongoConnection = ():void => {
    try {
        mongoose.connect(
            "mongodb://localhost/wheely",
            () => console.log("connected to database")
        );
    } catch(err) {
        console.error(err)
    }
}

export default initialiseMongoConnection;
