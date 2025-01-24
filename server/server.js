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

app.post('/uploadMedia', async (req, res) => {
    return new Promise((resolve, reject) => {
        const chunks = []
        req.on("data", (data) => {
            chunks.push(data)
            // console.log(data, "K")
        })
        req.on("end", () => {
            console.log(chunks, "C")
            const aa = Buffer.concat(chunks)
            console.log(aa,"AA")
        })
        req.on("error", () => {
            reject()
        })

    })


  
})

app.listen(configs.port, () => {
    console.log(`Server is spining on port ${configs.port}`)
})