import express from "express";
import configs from "./config.js";

const app = express()


app.listen(() => {
    console.log(`Server is spining on port ${configs.port}`)
})