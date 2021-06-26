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

const employeeSearch = () =>{
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        console.log(results);
})};

const roleSearch = () =>{
  connection.query('SELECT * FROM emp_role', (err, results) => {
      if (err) throw err;
      console.log(results);
})};

const departmentSearch = () =>{
  connection.query('SELECT * FROM department', (err, results) => {
      if (err) throw err;
      console.log(results);
})};

const employeeAdd = () =>{
  inquirer
      .prompt([
        {
          name: 'id',
          type: 'input',
          message: 'Enter ID: '
        }
      ])
      .then((answer) => {
        const query = connection.query(
          'INSERT INTO employee (id,',
          
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} product inserted!\n`);
            
           
          }
        );
      }

      )};

connection.connect((err) => {
    if (err) throw err;
    
    start();
});