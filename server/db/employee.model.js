// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  created: {
    type: Date,
    default: Date.now,
  },
  present: Boolean,
  equipment: Array,
  favBrand: Schema.Types.ObjectId,
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Color",
    
  },
  salary: Number,
  readBooks: [{
    name: String,
    author: String
  }]
});

module.exports = mongoose.model("Employee", EmployeeSchema);
