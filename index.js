const express = require("express");
const db = require("./database"),
    employeeRoutes = require("./controller/employee.controller"),
bodyparser = require("body-parser");
require("express-async-errors");
const cors = require("cors");

const app = express();

//middleware
app.use(bodyparser.json());
app.use(cors());
app.use("/api/employees", employeeRoutes);
app.use((err, res, req, next) => {
    console.log(err);
    res.status(err.statusCode).send("Something went wrong!");
});

const port = 9089
app.listen(port, () => console.log(`server started on http://localhost:${port}`));

db.query("SELECT 1").then(data => console.log("Database connected!")).catch(err => console.log("Database error!"));
