DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;


CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (

id INT PRIMARY KEY,

title VARCHAR(30),

salary DECIMAL,

department_id INT,
FOREIGN KEY (department_id)
REFERENCES department (id)

);

CREATE TABLE employee (

id INT PRIMARY KEY,

first_name VARCHAR(30),

last_name VARCHAR(30),

role_id INT,

manager_id INT,

FOREIGN KEY (role_id)
REFERENCES role (id),

FOREIGN KEY (manager_id)
REFERENCES employee(id)

);

-- employee
-- 1 Maryna S, null
-- 2 Trinh N, 1