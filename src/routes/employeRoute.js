const express = require("express");
const {
  createEmployee,
  getEmployees,
  getSingleEmployee,
  deleteSingleEmployee,
} = require("../controllers/employeController");

const employeRoute = express.Router();

employeRoute.post("/create", createEmployee);
// employeRoute.delete("/delete/:id", deleteSingleMessage);
employeRoute.get("/", getEmployees);
employeRoute.get("/:id", getSingleEmployee);
employeRoute.delete("/delete/:id", deleteSingleEmployee);

module.exports = employeRoute;
