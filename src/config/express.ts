import express from "express";
import initialiseMongoConnection from "./database/db";
import routes from "../routes/auth.routes";

const app = () => {
    const app = express();

    // CONSTS
    const PORT = process.env.PORT || 3000

    // Middleware
    app.use(express.json());

    initialiseMongoConnection();

    // Routing
    app.use("/api", routes);

    app.listen(PORT , () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

export default app;