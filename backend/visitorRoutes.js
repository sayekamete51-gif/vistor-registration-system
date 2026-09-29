const express = require("express");

const router = express.Router();

const Visitor = require("./models/Visitor");
const Employee = require("./models/Employee");


// ==========================================
// CREATE VISITOR
// ==========================================

router.post("/", async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            purpose,
            personToMeet,
            visitDate
        } = req.body;

        const employee = await Employee.findById(personToMeet);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        const visitor = new Visitor({
            name,
            email,
            phone,
            purpose,
            personToMeet,
            visitDate
        });

        const savedVisitor = await visitor.save();

        res.status(201).json({
            message: "Visitor registered successfully",
            visitor: savedVisitor
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to register visitor",
            error: error.message
        });
    }
});


// ==========================================
// GET ALL VISITORS
// ==========================================

router.get("/", async (req, res) => {
    try {
        const { status, search } = req.query;

        const filter = {};

        // Filter by status
        if (status) {
            filter.status = status;
        }

        // Search visitor
        if (search) {
            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    email: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    purpose: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        const visitors = await Visitor
            .find(filter)
            .populate(
                "personToMeet",
                "name email department designation employeeId"
            )
            .sort({ createdAt: -1 });

        res.status(200).json(visitors);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch visitors",
            error: error.message
        });
    }
});


// ==========================================
// GET VISITOR STATISTICS
// IMPORTANT: This MUST be before /:id
// ==========================================

router.get("/stats", async (req, res) => {
    try {
        const totalVisitors = await Visitor.countDocuments();

        const pending = await Visitor.countDocuments({
            status: "Pending"
        });

        const approved = await Visitor.countDocuments({
            status: "Approved"
        });

        const rejected = await Visitor.countDocuments({
            status: "Rejected"
        });

        const completed = await Visitor.countDocuments({
            status: "Completed"
        });

        res.status(200).json({
            totalVisitors,
            pending,
            approved,
            rejected,
            completed
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch visitor statistics",
            error: error.message
        });
    }
});


// ==========================================
// GET SINGLE VISITOR
// ==========================================

router.get("/:id", async (req, res) => {
    try {
        const visitor = await Visitor
            .findById(req.params.id)
            .populate(
                "personToMeet",
                "name email department designation employeeId"
            );

        if (!visitor) {
            return res.status(404).json({
                message: "Visitor not found"
            });
        }

        res.status(200).json(visitor);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch visitor",
            error: error.message
        });
    }
});


// ==========================================
// UPDATE VISITOR STATUS
// ==========================================

router.patch("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Approved",
            "Rejected",
            "Completed"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status",
                allowedStatuses
            });
        }

        const visitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true
            }
        ).populate(
            "personToMeet",
            "name email department designation employeeId"
        );

        if (!visitor) {
            return res.status(404).json({
                message: "Visitor not found"
            });
        }

        res.status(200).json({
            message: "Visitor status updated successfully",
            visitor
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update visitor status",
            error: error.message
        });
    }
});


// ==========================================
// DELETE VISITOR
// ==========================================

router.delete("/:id", async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndDelete(
            req.params.id
        );

        if (!visitor) {
            return res.status(404).json({
                message: "Visitor not found"
            });
        }

        res.status(200).json({
            message: "Visitor deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete visitor",
            error: error.message
        });
    }
});


// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;