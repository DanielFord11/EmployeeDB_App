-- Seed data for departments table
INSERT INTO departments (department_name) VALUES
  ('Marketing'),
  ('Sales'),
  ('Human Resources');

-- Seed data for roles table
INSERT INTO roles (role_title, salary, department_id) VALUES
  ('Marketing Manager', 60000.00, 1),
  ('Marketing Coordinator', 40000.00, 1),
  ('Sales Manager', 70000.00, 2),
  ('Sales Representative', 50000.00, 2),
  ('HR Manager', 65000.00, 3),
  ('HR Assistant', 35000.00, 3);

-- Seed data for employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Mike', 'Johnson', 3, NULL),
  ('Sarah', 'Williams', 4, 3),
  ('David', 'Brown', 5, NULL),
  ('Amy', 'Davis', 6, 5);