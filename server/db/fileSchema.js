import mongoose from "mongoose";
const { Schema, model } = mongoose;

const fileSchema = new Schema({
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: String, required: true },
    file: { type: String, required: true }
}, { timestamps: true });


const File = model("File", fileSchema);
export default File;
