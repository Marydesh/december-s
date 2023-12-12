
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db')
const questions = [{
  type: 'list',
  name: 'choice',
  message: 'Select one from the following:',
  choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
}]


function viewAllDepartments() {
  db.viewAllDepartments()
    .then(function ([depData]) {
      console.table(depData)
      loadOptions()
    })
}

function viewAllRoles() {
  db.viewAllRoles()
    .then(function ([roleData]) {
      console.table(roleData)
      loadOptions()
    })
}

function loadOptions() {
  inquirer
    .prompt(questions)

    .then((answers) => {
      console.log(answers)
      switch (answers.choice) {
        case 'view all departments':
          viewAllDepartments();
          break;
        case 'view all roles':
          viewAllRoles();
          break;
        case 'view all employees':
          viewAllEmployees();
          break;
        case 'add a department':
          addDepartment();
          break;
        case 'add a role':
          addRole();
          break;
        case 'add an employee':
          addEmployee();
          break;
        case 'update an employee role':
          updateEmployeeRole();
          break;
        default:
          console.log('Invalid choice');
      }

      //either if or switch to match the choice that user chose
      //case 'view all departments'
      //viewAllDepartments()
    
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

loadOptions()