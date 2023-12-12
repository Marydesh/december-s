INSERT INTO department (name)
values ('technology'),
       ("accounting"),
       ("HR");

INSERT INTO role (title, salary, department_id)
VALUES ('developer', 100000.00, 1),
('accountant', 90000.00, 2),
('HR ADMINISTARTOR',90000.00, 3),
('dev manager', 200000.00, 1),
('finance manger', 150000.00, 2),
('hr manager', 180000.00, 3 );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("john","doe", 4, null),
('ana','bell', 1, 11),
('mary', 'ann', 6, null),
('phil','doe', 3, 13);