import mongoose from "mongoose";
import configs from "../config.js";

mongoose
    .connect(configs.mongoDBUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => {
        console.error('Connection error', error);
        // process.exit(1);
    });
