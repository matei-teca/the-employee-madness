/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const brandNames = require("./brands.json");
const colors = require("./colors.json");
const ColorModel = require("../db/color.model")
const EmployeeModel = require("../db/employee.model");
const BrandModel = require("../db/brand.model")

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const colorsList = await ColorModel.find();

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    color: colorsList.slice(0, Math.floor(Math.random() * colorsList.length - 1)).sort(()=>Math.random() - 0.5)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populateBrands = async () => {
  const brands = brandNames.map((name) => ({
    name
  }))

  await BrandModel.create(...brands);
  console.log("Brands Created");
}

const populateColors = async () => {
  await ColorModel.deleteMany();

  const colorsList = colors.map((color) => ({
    name: color
  }));

  await ColorModel.create(...colorsList);
  console.log("Colors created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  // await populateBrands();

  await populateColors();
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
