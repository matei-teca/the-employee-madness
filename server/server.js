require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.post("/api/equipments",(req, res) => {

  let name = req.body.name;
  let type = req.body.type;
  let amount = req.body.amount;
  let created = Date.now();

  const equipment = new EquipmentModel({
    name,
    type,
    amount,
    created
  })

  equipment.save()

  .then(equipment => res.status(200).send({message: "The equipment was added to the database"}))
  .catch(err => res.status(400).send({message: "The equipment was NOT added to the database", error: err}))

})

app.get("/api/equipments", async (req, res) => {
  const equipments = await EquipmentModel.find().sort({ created: "desc" });
  res.json(equipments)
})

app.get("/api/employee/:fullName", async (req, res) => {
  const employee = await EmployeeModel.find({name: req.params.fullName});
  return res.json(employee);

  // res.json({message: "works"})
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
