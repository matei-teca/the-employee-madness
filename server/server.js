require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");
const BrandModel = require("./db/brand.model")
const ColorModel = require("./db/color.model")

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
  const employees = await EmployeeModel.find().populate("color").sort({ created: "desc" });
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

app.patch("/api/equip/employees/:id", async (req, res, next) => {

  try {
    const findEmployee = await EmployeeModel.findOne({_id: req.params.id});
    const existingEmployeeEquipment = findEmployee.equipment;
    existingEmployeeEquipment.push(req.body.selectedEquipmentId);

    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { equipment: existingEmployeeEquipment },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }

})

app.patch("/api/assign/brand", async (req, res, next) => {

  try {
    const brands = await BrandModel.find();
    const brandsIds = brands.map(brand => brand._id);
    const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];
    
    const employees = await EmployeeModel.find();

    employees.map(async (employee) => {
      const updatedEmployees = await EmployeeModel.findOneAndUpdate({_id: employee._id},{ 
        favBrand: pick(brandsIds)
      })
    })

    return res.json({message: `A randomly chosen brand was assigned to each employee's field favBrand`});
  } catch (err) {
    return next(err);
  }

})

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.post("/api/equipment",(req, res) => {

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

app.get("/api/equipment", async (req, res) => {
  const equipment = await EquipmentModel.find().sort({ created: "desc" });
  res.json(equipment)
})

app.get("/api/brands", async (req, res) => {
  const brands = await BrandModel.find().sort({ created: "desc" });
  res.json(brands)
})



app.get("/api/employee/:fullName", async (req, res) => {
  const employee = await EmployeeModel.find({name: req.params.fullName});
  return res.json(employee);
});

app.patch("/api/attendance/:id", async (req,res) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { present: req.body.isPresent },
      { new: true }
    );
    return res.json({message: `Employees's attendance updated to "present: ${req.body.isPresent}"`});
  } catch (err) {
    return next(err);
  }
})

app.get("/api/employee/:id/equipment", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOne({_id: req.params.id});

    let convertedEquipmentArray = [];
    let allEquipment = await EquipmentModel.find();

    allEquipment.forEach(async (item) => {

      employee.equipment.forEach(currId => {
        if(item.id === currId){
          convertedEquipmentArray.push(item)
        }
      })
      
    });

    return res.json({currEquipmentResponse: convertedEquipmentArray})
  } catch (err) {
    return next(err); 
  }
})

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

