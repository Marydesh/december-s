const connection = require('./connection')

class DB {
    constructor(connection) {
        this.connection = connection
    }

    viewAllDepartments(){
        //.then
        return this.connection.promise().query('SELECT * FROM department')
    }

    viewAllRoles(){
        return this.connection.promise().query('SELECT * FROM role')
        
    }
    async viewAllManagers() {
        let managers = await this.connection.promise().query('SELECT * FROM employee WHERE manager_id IS NOT NULL')
        return managers
    }
    viewAllEmployees() {
        // return this.connection.promise().query('SELECT * FROM employee')
        return this.connection.promise().query('SELECT e.first_name AS employee_first_name, e.last_name AS employee_last_name,r.title AS employee_title, r.salary AS employee_salary, d.name AS department_name, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id')
    }
    addDepartment(departmentName) {
        return this.connection.promise().query('INSERT INTO department (name) VALUES (?) ',[departmentName])
        .then(function (departmentData) {
            if (departmentData && departmentData.length > 0) {
                console.log("Department Data:");
                console.table(departmentData[0]);
              } else {
                console.log("Department data is empty or undefined.");
              }
              return departmentData;
          });
    }
    addRole(title, salary, department_id) {
        return this.connection
            .promise().query(
                'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', 
                [title, salary, department_id]
                )
        .then(roleData => {
            if (roleData && roleData.length > 0) {
                console.log("Role Data:");
                console.table(roleData[0]);
              } else {
                console.log("Role data is empty or undefined.");
              }
              return roleData;
        })
    }
    addEmployee(first_name, last_name, role_id, manager_id) {
        return this.connection
            .promise().query(
                'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', 
                [first_name, last_name, role_id, manager_id]
                )
        .then(employeeData => {
            if (employeeData && employeeData.length > 0) {
                console.log("Employee Data:");
                console.table(employeeData[0]);
              } else {
                console.log("Employee data is empty or undefined.");
              }
              return employeeData;
        })
    }
    updateEmployeeRole() {
        return this.connection.promise().query('SELECT * FROM role')
    }

}

module.exports = new DB(connection)



