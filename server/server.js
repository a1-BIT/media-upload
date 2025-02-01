import express from "express";
import helmet from "helmet";
import configs from "./config.js";
import "./db/connection.js"; // Ensure this initializes the DB connection
import File from "./db/fileSchema.js";

const app = express();
app.use(helmet());
app.use(express.json());

// CORS headers (can use the `cors` library instead)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get("/welcome", (req, res) => {
    res.send({ msg: "hello" });
});

app.post("/uploadMedia", async (req, res) => {
    try {
        const chunks = [];
        req.on("data", (data) => {
            chunks.push(data);
        });

        req.on("end", async () => {
            try {
                const buffer = Buffer.concat(chunks);
                console.log("Received Buffer:", buffer);

                const boundary = req.headers['content-type'].split('boundary=')[1]
                console.log('boundary:', boundary)
                const parts = buffer.toString().split(boundary).slice(1, -1);
                console.log('parts:', parts, parts.length)
                // const newFile = new File({ file: buffer })
                // const savedFile = await newFile.save()

                // console.log("Database Update Result:", result);
                // res.status(201).send({ msg: "File saved successfully", fileId: savedFile._id });
            } catch (err) {
                console.error("Error processing file:", err);
                res.status(500).send({ error: "Error processing file" });
            }
        });

        req.on("error", (err) => {
            console.error("Request Error:", err);
            res.status(500).send({ error: "Error receiving file" });
        });
    } catch (err) {
        console.error("Unexpected Error:", err);
        res.status(500).send({ error: "Unexpected error occurred" });
    }
});

app.listen(configs.port, () => {
    console.log(`Server is running on port ${configs.port}`);
});
