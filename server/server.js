import express from "express";
import helmet from 'helmet'
import configs from "./config.js";

const app = express()
app.use(helmet())
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get('/welcome', (req, res) => {
    res.send({ msg: 'hello' })
})

app.post('/uploadMedia', (req, res) => {
    console.log("AMIT")
    console.log(req.body)
    res.status(200).send()
})

app.listen(configs.port, () => {
    console.log(`Server is spining on port ${configs.port}`)
})