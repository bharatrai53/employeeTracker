const db = require("./db/connection");

class Queries {
  constructor(db) {
    this.db = db;
  }

  // Function to display all departments
  viewDepartments() {
    return this.db.promise().query("SELECT * FROM department");
  }

  // Function to add a department
  addDepartment(name) {
    return this.db.promise().query(
      "INSERT INTO department (dept_name) VALUES (?)",
      name
    );
  }

  // Function to display all roles
  viewRoles() {
    return this.db.promise().query(`
      SELECT role.id, role.title, role.salary, department.dept_name
      FROM role
      INNER JOIN department ON role.dept_id = department.id
    `);
  }

  // Function to add a role
  addRole(title, salary, department_id) {
    return this.db.promise().query(
      "INSERT INTO role (title, salary, dept_id) VALUES (?, ?, ?)",
      [title, salary, department_id]
    );
  }

  // Function to display all employees
  viewEmployees() {
    return this.db.promise().query(`
      SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.dept_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id
      LEFT JOIN department ON role.dept_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id
    `);
  }

  // Function to add an employee
  addEmployee(first_name, last_name, role_id, manager_id) {
    return this.db.promise().query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [first_name, last_name, role_id, manager_id]
    );
  }

  // Function to update an employee's role
  updateEmployeeRole(employee_id, role_id) {
    return this.db.promise().query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [role_id, employee_id]
    );
  }

  // Function to update an employee's manager
  updateEmployeeManager(employee_id, manager_id) {
    return this.db.promise().query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [manager_id, employee_id]
    );
  }

  // Function to get all roles for use in prompts
  getAllRoles() {
    return this.db.promise().query("SELECT id, title FROM role");
  }

  // Function to get all employees for use in prompts
  getAllEmployees() {
    return this.db.promise().query(`
      SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee
    `);
  }

  // Function to get all departments for use in prompts
  getAllDepartments() {
    return this.db.promise().query("SELECT id, dept_name FROM department");
  }
}

module.exports = new Queries(db);
