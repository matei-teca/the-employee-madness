import mongoose, { Schema } from "mongoose";

const BrandSchema = new Schema({
    name: String
})

module.exports = mongoose.model("Brand", BrandSchema);