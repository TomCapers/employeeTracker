const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  
  port: 3306,

  user: 'root',
  
  password: '2299@Zeus!',
  database: 'staff_db',
});

const start = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View Employees',
        'View Roles',
        'View Departments',
        'Add Employee',
        'Add Role',
        'Add Department'
      ],
    })
    .then((answer) => {
      switch (answer) {
        case 'View Employees':
          employeeSearch();
          break;
        case 'View Roles':
          roleSearch();
          break;
        case 'View Departments':
          departmentSearch();
          break;
        case 'Add Employee':
          employeeAdd();
          break;
        case 'Add Role':
          roleAdd();
          break;
        case 'Add Department':
          departmentAdd();
          break;
        
      }
    });
};

connection.connect((err) => {
    if (err) throw err;
    
    start();
});