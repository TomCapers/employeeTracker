INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Brady", 1, null), ("Ryan", "Tannehill", 1, null), ("Derrick", "Henry", 2, 2), ("Julio", "Jones", 2, 2), ("Antonio", "Brown", 3, 1);

INSERT INTO emp_role (title, salary, department_id)
VALUES ("Manager", 100000, 1), ("Talent", 75000, 2), ("Baggage", 50000, 3);

INSERT INTO department (name)
VALUES ("Quaterback"), ("Player"), ("Project");