DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db; 


-- create the department table and fields
-- department.id <=join=> role.deparment_id (one to many)
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Create the role table and fields 
-- role.id <=join=> employee.role_id (one to many)
-- role.department_id <=join=> department.id (many to one)
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
        REFERENCES department(id)
        ON DELETE SET NULL
);

-- Create the employee table and fields
-- employee.id <=join=> employee.manager_id (one to many)
-- employee.role_id <=join=> role.ID (many to one)
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT DEFAULT null,
    FOREIGN KEY (role_id)
        REFERENCES role(id)
        ON DELETE CASCADE,
    FOREIGN KEY (manager_id)
        REFERENCES employee(id)
        ON DELETE SET NULL
);
