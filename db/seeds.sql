USE company_db;
INSERT INTO department(dept_name) VALUES ("Admin"), ("HR"), ("Sales");
INSERT INTO role(title, salary, dept_id) VALUES ("Administrator", 50000, 1), ("Manager", 70000, 2), ("Sales Rep", 40000, 3) ;
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Beth", "Sue", 2, null), ("Bharat", "Rai", 1, 1), ("Kavita", "Sue", 3, 1);