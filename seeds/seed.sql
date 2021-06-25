INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1,"Tom", "Brady", 1, null), (2,"Ryan", "Tannehill", 1, null), (3,"Derrick", "Henry", 2, 2), (4, "Julio", "Jones", 2, 2), (5, "Antonio", "Brown", 3, 1);

INSERT INTO emp_role (id, title, salary, department_id)
VALUES (1, "Manager", 100000, 1), (2, "Talent", 75000, 2), (3, "Baggage", 50000, 3);

INSERT INTO department (id, name)
VALUES (1, "Quaterback"), (2, "Player"), (3, "Project");