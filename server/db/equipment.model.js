const mongoose = require("mongoose");
const { Schema } = mongoose;

const EquipmentSchema = new Schema({
    name: String,
    type: String,
    amount: Number,
    created: Date
})

module.exports = mongoose.model("Equipment", EquipmentSchema);

