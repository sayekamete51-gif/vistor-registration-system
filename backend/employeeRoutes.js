const express = require("express");
const router = express.Router();

const Employee = require("./models/Employee");


// ==========================================
// CREATE EMPLOYEE
// ==========================================

router.post("/", async (req, res) => {
    try {
        const employee = new Employee(req.body);

        const savedEmployee = await employee.save();

        res.status(201).json({
            message: "Employee created successfully",
            employee: savedEmployee
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create employee",
            error: error.message
        });
    }
});


// ==========================================
// GET ALL EMPLOYEES
// ==========================================

router.get("/", async (req, res) => {
    try {
        const employees = await Employee
            .find()
            .sort({ createdAt: -1 });

        res.status(200).json(employees);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch employees",
            error: error.message
        });
    }
});


// ==========================================
// GET EMPLOYEE STATISTICS
// IMPORTANT: THIS MUST BE BEFORE /:id
// ==========================================

router.get("/stats", async (req, res) => {
    try {
        const totalEmployees =
            await Employee.countDocuments();

        const activeEmployees =
            await Employee.countDocuments({
                status: "Active"
            });

        const inactiveEmployees =
            await Employee.countDocuments({
                status: "Inactive"
            });

        res.status(200).json({
            totalEmployees,
            activeEmployees,
            inactiveEmployees
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch employee statistics",
            error: error.message
        });
    }
});


// ==========================================
// GET SINGLE EMPLOYEE
// ==========================================

router.get("/:id", async (req, res) => {
    try {
        const employee =
            await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json(employee);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch employee",
            error: error.message
        });
    }
});


// ==========================================
// UPDATE EMPLOYEE
// ==========================================

router.put("/:id", async (req, res) => {
    try {
        const employee =
            await Employee.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee updated successfully",
            employee
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update employee",
            error: error.message
        });
    }
});


// ==========================================
// DELETE EMPLOYEE
// ==========================================

router.delete("/:id", async (req, res) => {
    try {
        const employee =
            await Employee.findByIdAndDelete(
                req.params.id
            );

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete employee",
            error: error.message
        });
    }
});


// ==========================================
// EXPORT
// ==========================================

module.exports = router;