const dns = require("dns");

// Force Node.js to use reliable public DNS servers
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());


// ==========================================
// ROUTES
// ==========================================

const visitorRoutes = require("./visitorRoutes");
const employeeRoutes = require("./employeeRoutes");

app.use("/api/visitors", visitorRoutes);
app.use("/api/employees", employeeRoutes);


// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.send("Employee Visitor System Backend is Running!");
});


// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB Connected Successfully");

        app.listen(
            process.env.PORT || 5000,
            () => {
                console.log(
                    `Server running on http://localhost:${process.env.PORT || 5000}`
                );
            }
        );

    })
    .catch((error) => {

        console.log("MongoDB Connection Error:");
        console.log(error.message);

    });