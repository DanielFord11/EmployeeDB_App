
// View all departments
// SELECT department_id, department_name
// FROM departments;

// View all roles
// SELECT r.role_id, r.role_title, d.department_name, r.salary
// FROM roles r
// JOIN departments d ON r.department_id = d.department_id;

// View all employees:
// SELECT e.employee_id, e.first_name, e.last_name, r.role_title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
// FROM employees e
// JOIN roles r ON e.role_id = r.role_id
// JOIN departments d ON r.department_id = d.department_id
// LEFT JOIN employees m ON e.manager_id = m.employee_id;

//Add a department
// INSERT INTO departments (department_name)
// VALUES ('New Department');

// add a role
// INSERT INTO roles (role_title, salary, department_id)
// VALUES ('New Role', 50000.00, 1);

// Add an employee
// INSERT INTO employees (first_name, last_name, role_id, manager_id)
// VALUES ('John', 'Doe', 1, 2);

// Update an employee role:
// UPDATE employees
// SET role_id = 2
// WHERE employee_id = 1;
const util = require('util');
const mysql = require('mysql');
const db = require('./connection');

// View all departments
function viewAllDepartments() {
  return db.query('SELECT department_id, department_name FROM departments');
}

// View all roles
function viewAllRoles() {
  return db.query(`
    SELECT r.role_id, r.role_title, d.department_name, r.salary
    FROM roles r
    JOIN departments d ON r.department_id = d.department_id
  `);
}

// View all employees
function viewAllEmployees() {
  return db.query(`
    SELECT e.employee_id, e.first_name, e.last_name, r.role_title, d.department_name, r.salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e
    JOIN roles r ON e.role_id = r.role_id
    JOIN departments d ON r.department_id = d.department_id
    LEFT JOIN employees m ON e.manager_id = m.employee_id
  `);
}

// Add a department
function addDepartment(departmentName) {
  return db.query('INSERT INTO departments (department_name) VALUES (?)', [departmentName]);
}

// Add a role
function addRole(roleTitle, salary, departmentId) {
  return db.query('INSERT INTO roles (role_title, salary, department_id) VALUES (?, ?, ?)', [roleTitle, salary, departmentId]);
}

// Add an employee
function addEmployee(firstName, lastName, roleId, managerId) {
  return db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
}

// Update an employee role
function updateEmployeeRole(employeeId, newRoleId) {
  return db.query('UPDATE employees SET role_id = ? WHERE employee_id = ?', [newRoleId, employeeId]);
}

viewAllEmployees()
  .then(results => {
    console.log(results);
    console.log('this ran');
  })
  .catch(error => {
    console.error(error);
  });
