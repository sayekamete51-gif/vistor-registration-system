const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        purpose: {
            type: String,
            required: true,
            trim: true
        },

        personToMeet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            required: true
        },

        visitDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected", "Completed"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Visitor", visitorSchema);