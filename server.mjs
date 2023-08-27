import express from 'express'
import mysql from 'mysql2/promise';
import inquirer from 'inquirer'

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = await mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company_db'
  },
  console.log(`Connected to the company database.`)
);




async function firstPrompt(){
  while (true) {
const {accessDb} = await inquirer.prompt([
    {type: "list",
     name: "accessDb",
     message: "What would you like to access in the database? (Use arrow keys to navigate)",
     choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", 'Update employee manager', 'View employees by manager','View employees by department', 'Delete a department', 'Delete a role', 'Delete an employee', 'View the budget of a department',  "Exit" ]
    
  }
  ])
  switch (accessDb) {

      case 'View all departments':
      await viewAllDepartments(accessDb);
      break;

      case 'View all roles':
      await viewAllRoles();
      break;

      case 'View all employees':
      await viewAllEmployees();
      break;
    
      case 'Add a department':
      await addDepartment();
      break;

      case 'Add a role':
      await addRole();
      break;

      case 'Add an employee':
      await addEmployee();
      break;

      case 'Update an employee role':
      await updateEmployeeRole();
      break;

      case 'Update employee manager':
      await updateManager();
      break;

      case 'View employees by manager':
      await viewManager();
      break;

      case 'View employees by department':
      await viewByDpt();
      break;

      case 'Delete a department':
      await deleteDpt();
      break;

      case 'Delete a role':
      await deleteRole();
      break;

      case 'Delete an employee':
      await deleteEmployee();
      break; 

      case 'View the budget of a department':
      await budget();
      break;

    
      case 'Exit':
      console.log("Goodbye");
      return;
  }}
}

async function viewAllDepartments(accessDb) {
  const [rows, fields] = await db.execute('SELECT * FROM department');
  console.table(rows);
}

async function viewAllRoles(){
  const [rows, fields] = await db.execute('SELECT * FROM role');
  console.table(rows);
}

async function viewAllEmployees() {
  const [rows, fields] = await db.execute('SELECT * FROM employee');
  console.table(rows);
}


async function addDepartment() {
  const newDepartment = await inquirer.prompt([
    {
      type: 'input', 
      name: 'newDpt',
      message: 'What is the name of the new department? (name not to exceed 30 characters!)'
    }
  ])
  const query = `
  INSERT INTO department (name)
  VALUES(?)`;

  const result = await db.execute(query, [newDepartment.newDpt]);
  console.log('New department added!');
  

}

async function addRole() {
  const newRole = await inquirer.prompt([
    {
      type: 'input', 
      name: 'title',
      message: 'What is the name of the new Role? (name not to exceed 30 characters!)'
    },
    {
      type: 'input', 
      name: 'salary',
      message: 'What is the salary for the new Role? '
    },
    {
      type: 'input', 
      name: 'department_id',
      message: 'What is the id of the department that this role will belong to? '
    }
  ])
  const query = `
  INSERT INTO role (title, salary, department_id)
  VALUES(?, ?, ?)`;

  const result = await db.execute(query, [newRole.title, newRole.salary, newRole.department_id]);
  console.log('New role added!');
}

async function addEmployee() {
  const newEmployee = await inquirer.prompt([
    {
      type: 'input', 
      name: 'first_name',
      message: 'What is the first name of the new employee? (name not to exceed 50 characters!)'
    },
    {
      type: 'input', 
      name: 'last_name',
      message: 'What is the last name of the new employee? (name not to exceed 50 characters!)'
    },
    {
      type: 'input', 
      name: 'role_id',
      message: 'What is the id of the role that this employee will belong to? '
    },
    {
      type: 'input', 
      name: 'manager_id',
      message: 'What is the id of this employees manager? If the employee will not have a manager just press enter. '
    }
  ])
// because inquirer returns "" if the user does not enter anything on an input we must convert the empty string to the value null before passing it to the db query. 
// the code below is checking if the user input for newEmployee.manager_id returns an empty string. the ? sets up an if true vs if false statement divided by the : so if its true that newEmployee.manager_id is an empty string, set the constant to null, if false then set the constant to the user input
  const managerId = newEmployee.manager_id === "" ? null : newEmployee.manager_id;
  const query = `
  INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES(?, ?, ?, ?)`;

  const result = await db.execute(query, [newEmployee.first_name, newEmployee.last_name, newEmployee.role_id, managerId]);
  console.log('New employee added!');
}

async function updateEmployeeRole(){
  const updateEmpRole = await inquirer.prompt([
    {
      type: 'input', 
      name: 'newRole',
      message: 'What is the id for the employees new role? '
    },
    {
      type: 'input', 
      name: 'first_name',
      message: 'What is the first name of the employee whos role you would like to update?'
    },
    {
      type: 'input', 
      name: 'last_name',
      message: 'What is the last name of the employee whos role you would like to update? '
    }
  ])
  const query = `
  UPDATE employee
  SET role_id = ?
  WHERE first_name = ? AND last_name = ?
  `;

  const result = await db.execute(query, [updateEmpRole.newRole, updateEmpRole.first_name, updateEmpRole.last_name]);
  console.log('Employee role updated!');

}

async function updateManager() {
  const updateEmpManager = await inquirer.prompt([
    {
      type: 'input', 
      name: 'first_name',
      message: 'What is the first name of the employee whos manager you would like to update?'
    },
    {
      type: 'input', 
      name: 'last_name',
      message: 'What is the last name of the employee whos manager you would like to update? '
    },
    {
      type: 'input', 
      name: 'newManager',
      message: 'What is the id employees new manager? '
    }
  ])
  const query = `
  UPDATE employee
  SET manager_id = ?
  WHERE first_name =? AND last_name = ?
  `;

  const result = await db.execute(query, [updateEmpManager.newManager, updateEmpManager.first_name, updateEmpManager.last_name]);
  console.log('Employee manager updated!');
}

async function viewManager() {
  const managerView = await inquirer.prompt([
    {
      type: 'input', 
      name: 'managerId',
      message: 'What is the id of the manager whos employees you would like to view?'
    },
    
  ])
  const query = `
  SELECT first_name, last_name, role_id FROM employee
  WHERE manager_id = ?
  `;

  const [rows, fields] = await db.query(query, [managerView.managerId]);
  
  console.table(rows);
}

async function viewByDpt() {
  const dptView = await inquirer.prompt([
    {
      type: 'input', 
      name: 'departmentName',
      message: 'What is the name of the department whos employees you would like to view?'
    },
    
  ])
  const query = `
  SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id
  FROM employee
  JOIN role ON employee.role_id = role.id
  JOIN department ON role.department_id = department.id
  WHERE department.name = ?
  `;

  const [rows, fields] = await db.query(query, [dptView.departmentName]);
  console.table(rows);
}

async function deleteDpt() {
  const removeDpt = await inquirer.prompt([
    {
      type: 'input', 
      name: 'name',
      message: 'What is the name of the department you would like to delete?'
    }
  ])
  const query = `
  DELETE FROM department 
  where name = ?
  `;

  const result = await db.query(query, [removeDpt.name]);
  console.log('Chosen department removed!');
}

async function deleteRole() {
  const removeRole = await inquirer.prompt([
    {
      type: 'input', 
      name: 'name',
      message: 'What is the name of the role you would like to delete?'
    }
  ])
  const query = `
  DELETE FROM role 
  where title = ?
  `;

  const result = await db.query(query, [removeRole.name]);
  console.log('Chosen role removed!');
}

async function deleteEmployee() {
  const removeEmployee = await inquirer.prompt([
    {
      type: 'input', 
      name: 'firstName',
      message: 'What is the first name of the employee you would like to delete?'
    },
    {
      type: 'input', 
      name: 'lastName',
      message: 'What is the last name of the employee you would like to delete?'
    },
    {
      type: 'input', 
      name: 'roleID',
      message: 'What is the role id of the employee you would like to delete?'
    }
  ])
  const query = `
  DELETE FROM employee 
  where first_name = ? AND last_name = ? AND role_id = ?
  `;

  const result = await db.query(query, [removeEmployee.firstName, removeEmployee.lastName, removeEmployee.roleID]);
  console.log('Chosen employee removed!'); 
}

async function budget() {
  const sumBudget = await inquirer.prompt([
    {
      type: 'input', 
      name: 'name',
      message: 'What is the name of the department whos budget you would like to view?'
    }
  ])
  const query = `
  SELECT department.name, SUM(role.salary) AS total_budget 
  FROM department
  JOIN role on department.id = role.department_id
  JOIN employee ON role.id = employee.role_id
  where department.name = ?
  GROUP BY department.id
  `;

  const [rows, fields] = await db.query(query, [sumBudget.name]);
  console.table(rows);

  
}

firstPrompt().catch(error => {
  console.error('An error occurred:', error)
});



