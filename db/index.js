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
    viewAllEmployees() {
        return this.connection.promise().query('SELECT e.first_name AS employee_first_name, e.last_name AS employee_last_name,r.title AS employee_title, r.salary AS employee_salary, d.name AS department_name, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id')
    }
    addDepartment() {
        return this.connection.promise().query('INSERT INTO department (name)')
    }
    addRole() {
        return this.connection.promise().query('SELECT * FROM role')
    }
    addEmployee() {
        return this.connection.promise().query('SELECT * FROM role')
    }
    updateEmployeeRole() {
        return this.connection.promise().query('SELECT * FROM role')
    }

}

module.exports = new DB(connection)



