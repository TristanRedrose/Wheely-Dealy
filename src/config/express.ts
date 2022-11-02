import express from "express";
import initialiseMongoConnection from "./database/db";
import routes from "../routes/routes";
import cors from 'cors'

const app = () => {

    const app = express();

    // CONSTS
    const PORT = process.env.PORT || 3000

    // Middleware
    app.use(cors());
    app.use(express.json());

    initialiseMongoConnection();

    // Routing
    app.use("/api", routes);

    process.on('uncaughtException', async(error:Error) => {
        process.exit(1);
    });

    process.on('unhandledRejection', (error: Error) => {
        throw error;
    })

    app.listen(PORT , () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

export default app;