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
    database: 'company.db'
  },
  console.log(`Connected to the company database.`)
);