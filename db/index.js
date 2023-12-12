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
        return
    }
    addDepartment() {
        return
    }
    addRole() {
        return
    }
    addEmployee() {
        return
    }
    updateEmployeeRole() {
        return
    }

}

module.exports = new DB(connection)