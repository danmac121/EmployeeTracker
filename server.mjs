import express from 'express'
import mysql from 'mysql2';
import inquirer from 'inquirer'

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
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
     choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
    
  }
  ])
  switch (action) {

      case 'View all departments':
      await viewAllDepartments();
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
      await updateEmployee();
      break;
    
  }}
}

async function viewAllEmployees() {
 
}

async function viewAllDepartments() {
  
}

async function addDepartment() {
  
}

async function addEmployee() {
  
}

firstPrompt().catch(error => {
  console.error('An error occurred:', error)
});