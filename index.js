/*
    callbacks
      3 forms
        1. pre-defined
          myFunction
        2. anonymous, old syntax
          function(){}
        3. anonymous, arrow syntax
          ()=>{}
    anonymous functions
    arrow syntax
    
    higher-order array methods
      forEach, map, filter, find, findIndex, every, some, sort, reduce

    async & promises
      a promise is a special object that represents an async task
        2 ways of dealing with promises
          1. old way (then/catch)
            Promise.then(()=>{}).catch(()=>{})
          2. new way (async/await)
            async function something() {
              let resolution = await Promise
              ...
            }
*/

const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db');
const { type } = require('os');
const questions = [{
  type: 'list',
  name: 'choice',
  message: 'Select one from the following:',
  choices: [
    'view all departments', 
    'view all roles', 
    'view all employees', 
    'add a department', 
    'add a role', 
    'add an employee', 
    'update an employee role'
  ]
}]

async function getAll(key) {
  let [data] = await db[`viewAll${key}`]()
  return data
}

function viewAllDepartments() {
  db.viewAllDepartments()
    .then(function ([depData]) {
      console.table(depData)
      loadOptions()
    })
}

/*
  async function viewAllDepartments() {
    let [depData] = await db.viewAllDepartments()
    console.table(depData)
    loadOptions()
  }
*/

function viewAllRoles() {
  db.viewAllRoles()
    .then(function ([roleData]) {
      console.table(roleData)
      loadOptions()
    })
}

function viewAllEmployees() {
  db.viewAllEmployees()
    .then(function ([employeeData]) {
      console.table(employeeData)
      loadOptions()
    })
}

function addDepartment() {
  inquirer
  .prompt([ 
    {
      type: "input",
      name: "departmentName",
      message: "What is the name of the department?"
    }
  ])
  .then(function (answer) {
    const departmentName = answer.departmentName;

    db.addDepartment(departmentName)
      .then(function (departmentData) {
        console.log(departmentData);
        loadOptions();
      })
      .catch(function (error) {
        console.error("Error adding department:", error);
      });
  })
  .catch(function (error) {
    console.error("Error prompting for department name:", error);
  });
}

async function addRole() {
  let departments = await getAll("Departments")
  let departmentNames = departments.map(dept => dept.name)
  let answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of the role?"
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary?"
    },
    {
      type: "list",
      name: "dept",
      message: "Which department?",
      choices: departmentNames
    },
  ])
  let deparmentId = departments.find(dept => dept.name === answers.dept).id
  let roleData = db.addRole(answers.title, answers.salary, deparmentId)
  console.table(roleData)
  loadOptions()
}

async function addEmployee() {
  let roles = await getAll("Roles")
  // console.log("Roles:", roles)
  let roleNames = roles.map(role => role.title)
  let managers = await getAll("Managers")
  // console.log("Managers:", managers)
  let managerNames = managers.map(mgr => mgr.first_name)
  let answers = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "First name:"
    },
    {
      type: "input",
      name: "lastName",
      message: "Last name:"
    },
    {
      type: "list",
      name: "role",
      message: "Which role?",
      choices: roleNames
    },
    {
      type: "list",
      name: "mgr",
      message: "Which manager?",
      choices: managerNames
    },
  ])
  let roleId = roles.find(role => role.title === answers.role).id
  let mgrId = managers.find(mgr => mgr.first_name === answers.mgr).manager_id
  let data = await db.addEmployee(
    answers.firstName,
    answers.lastName,
    roleId,
    mgrId
  )
  console.log(data)
  loadOptions()
}

async function updateEmployeeRole() {
  let roles = await getAll("Roles")
  let roleNames = roles.map(role => role.title)
  let employees = await getAll("Employees")
  let employeeNames = employees.map(em => em.first_name)
  let answers = await inquirer.prompt([
    {
      type: "list",
      name: "employee_id",
      message: "Which employee?",
      choices: employeeNames
    },
    {
      type: "list",
      name: "role_id",
      choices: roleNames,
      message: "Update role to...?"
    }
  ])
  let role_id = roles.find(role => role.title === answers.role_id).id
  let employee_id = employees.find(em => em.first_name === answers.employee_id).id
  await db.updateEmployeeRole(employee_id, role_id)
  // console.log(data)
  loadOptions()
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
      } else {
        // Something else went wrong
      }
    });
}

loadOptions()