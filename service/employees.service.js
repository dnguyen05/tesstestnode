const db = require("../database");

module.exports.getAllEmployees = async () => {
    const q = "SELECT * FROM employees";
    const [record] = await db.query(q);
    return record;
}

module.exports.getEmployeeByID = async (id) => {
    const q = "SELECT * FROM employees WHERE id = ?";
    const [record] = await db.query(q, [id]);
    return record;
}

module.exports.deleteEmployee = async (id) => {
    const q = "DELETE FROM employees WHERE id = ?";
    const [{affectedRows}] = await db.query(q, [id]);
    return affectedRows;
}

module.exports.addOrUpdateEmployee = async (obj, id = 0) => {
    const q = "CALL usp_employee_add_or_edit(?,?,?,?)";
    const value = [id, obj.name, obj.employee_code, obj.salary];
    const [[[{affectedRows}]]] = await db.query(q, value);
    return affectedRows;
}

