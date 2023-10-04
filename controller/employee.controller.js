const express = require("express"),
    router = express.Router();
const service = require("../service/employees.service");


// LOCALHOST/api/employees
router.get("/", async (req, res) => {
    const employees = await service.getAllEmployees();
    res.send(employees);
});

router.get("/:id", async (req, res) => {
    const employee = await service.getEmployeeByID(req.params.id);
    if (employee.length === 0) {
        res.status(404).json("No record found with this id: " + req.params.id);
    } else
        res.send(employee);
});

router.delete("/:id", async (req, res) => {
    const affectedRows = await service.deleteEmployee(req.params.id);
    if (affectedRows === 0) {
        res.status(404).json("No record found with this id: " + req.params.id);

    } else
        res.send("delete employee successfully!");

});

router.post("/", async (req, res) => {
    const affectedRows = await service.addOrUpdateEmployee(req.body);
    res.status(201).json("Created successfully ");

});

router.put("/:id", async (req, res) => {
    const data = await service.addOrUpdateEmployee(req.body, req.params.id);
    res.status(201).json("Edit successfully");

});

module.exports = router;
