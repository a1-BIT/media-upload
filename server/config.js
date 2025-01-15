import { configDotenv } from "dotenv"
configDotenv()
const configs = {
    port: process.env.PORT,
    mongoDBUri: process.env.MONGODB_URI
}

export default configs