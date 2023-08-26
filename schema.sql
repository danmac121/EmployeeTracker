DROP DATABASE IF EXISTS company_db;
-- Creates the company_db database --
CREATE DATABASE company_db;

-- use company_db database --
USE company_db;

-- Creates the table "produce" within company_db --
CREATE TABLE department (
  -- Creates a numeric column called "id" --
  id INT PRIMARY KEY AUTO_INCREMENT,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30) ,
salary DECIMAL ,
department_id INT 
FOREIGN KEY (department_id)
REFERENCES department(id)
);

CREATE TABLE employee (

id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(50) ,
last_name VARCHAR(50) ,
role_id INT ,
manager_id INT, 
FOREIGN KEY (role_id)
REFERENCES role(id)

)












