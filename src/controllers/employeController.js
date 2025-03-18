const Employee = require("../models/employeSchema"); // Use model instead of schema

// Create Employee
const createEmployee = async (req, res) => {
  const { employeId, name, email, department, designation } = req.body;

  try {
    const makeEmployee = await Employee.create({
      employeId,
      name,
      email,
      department,
      designation,
    });

    res
      .status(201)
      .json({ message: "Employee created successfully", makeEmployee });
  } catch (error) {
    res.status(500).json({ message: "Employee creation failed", error });
  }
};

// Get All Employees
const getEmployees = async (req, res) => {
  try {
    const allEmployees = await Employee.find();
    res.status(200).json(allEmployees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Employee retrieval failed", error });
  }
};

// Get Single Employee
const getSingleEmployee = async (req, res) => {
  const { id } = req.params; // Extract 'id' properly

  try {
    const oneEmployee = await Employee.findOne({ _id: id });

    if (!oneEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(oneEmployee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Employee retrieval failed", error });
  }
};

// Delete Single Employee
const deleteSingleEmployee = async (req, res) => {
  const { id } = req.params; // Extract 'id' properly

  try {
    const deletedEmployee = await Employee.findOneAndDelete({ _id: id });

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res
      .status(200)
      .json({ message: "Employee deleted successfully", deletedEmployee });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Employee deletion failed", error });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getSingleEmployee,
  deleteSingleEmployee,
};
