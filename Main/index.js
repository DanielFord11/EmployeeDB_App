const inquirer = require('inquirer');
const dbActions = require('./db/db_actions');

// Start the application
function startApp() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          console.log('Exiting the application');
          process.exit(0);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// View all departments
function viewAllDepartments() {
  dbActions
    .viewAllDepartments()
    .then((departments) => {
      console.table(departments);
      startApp();
    })
    .catch((error) => {
      console.error(error);
      startApp();
    });
}

// View all roles
function viewAllRoles() {
  dbActions
    .viewAllRoles()
    .then((roles) => {
      console.table(roles);
      startApp();
    })
    .catch((error) => {
      console.error(error);
      startApp();
    });
}

// View all employees
function viewAllEmployees() {
  dbActions
    .viewAllEmployees()
    .then((employees) => {
      console.table(employees);
      startApp();
    })
    .catch((error) => {
      console.error(error);
      startApp();
    });
}

// Add a department
function addDepartment() {
  inquirer
    .prompt({
      name: 'departmentName',
      type: 'input',
      message: 'Enter the name of the department:'
    })
    .then((answer) => {
      dbActions
        .addDepartment(answer.departmentName)
        .then(() => {
          console.log('Department added successfully!');
          startApp();
        })
        .catch((error) => {
          console.error(error);
          startApp();
        });
    })
    .catch((error) => {
      console.error(error);
      startApp();
    });
}

// Add a role
function addRole() {
  // Prompt for role details (name, salary, department)
  inquirer
    .prompt([
      {
        name: 'roleTitle',
        type: 'input',
        message: 'Enter the name of the role:'
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Enter the salary for the role:'
      },
      {
        name: 'departmentId',
        type: 'input',
        message: 'Enter the department ID for the role:'
      }
    ])
    .then((answers) => {
      dbActions
        .addRole(answers.roleTitle, parseFloat(answers.salary), parseInt(answers.departmentId))
        .then(() => {
          console.log('Role added successfully!');
          startApp();
        })
        .catch((error) => {
          console.error(error);
          startApp();
        });
    })
    .catch((error) => {
      console.error(error);
      startApp();
    });
}

// Add an employee
function addEmployee() {
  // Prompt for employee details (first name, last name, role, manager)
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'Enter the first name of the employee:'
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'Enter the last name of the employee:'
      },
      {
        name: 'roleId',
        type: 'input',
        message: 'Enter the role ID for the employee:'
      },
      {
        name: 'managerId',
        type: 'input',
        message: 'Enter the manager ID for the employee (leave blank if none):'
      }
    ])
    .then((answers) => {
      const managerId = answers.managerId.trim() === '' ? null : parseInt(answers.managerId);
      dbActions
        .addEmployee(answers.firstName, answers.lastName, parseInt(answers.roleId), managerId)
        .then(() => {
          console.log('Employee added successfully!');
          startApp();
        })
        .catch((error) => {
          console.error(error);
          startApp();
        });
    })
    .catch((error) => {
      console.error(error);
      startApp();
    });
}

// Update an employee role
function updateEmployeeRole() {
  // Prompt for employee ID and new role ID
  inquirer
    .prompt([
      {
        name: 'employeeId',
        type: 'input',
        message: 'Enter the ID of the employee to update:'
      },
      {
        name: 'newRoleId',
        type: 'input',
        message: 'Enter the new role ID for the employee:'
      }
    ])
    .then((answers) => {
      dbActions
        .updateEmployeeRole(parseInt(answers.employeeId), parseInt(answers.newRoleId))
        .then(() => {
          console.log('Employee role updated successfully!');
          startApp();
        })
        .catch((error) => {
          console.error(error);
          startApp();
        });
    })
    .catch((error) => {
      console.error(error);
      startApp();
    });
}

// Start the application
startApp();
