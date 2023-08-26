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
  console.log(rows);
}

async function viewAllRoles(){
  const [rows, fields] = await db.execute('SELECT * FROM role');
  console.log(rows);
}

async function viewAllEmployees() {
  const [rows, fields] = await db.execute('SELECT * FROM employee');
  console.log(rows);
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


}

async function updateManager() {
  
}

async function viewManager() {
  
}

async function viewByDpt() {
  
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
  
}

firstPrompt().catch(error => {
  console.error('An error occurred:', error)
});