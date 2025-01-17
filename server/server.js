import express from "express";
import configs from "./config.js";

const app = express()


app.get('/',(req, res)=>{
    res.send({msg: 'hello'})
})



app.listen(configs.port,() => {
    console.log(`Server is spining on port ${configs.port}`)
})