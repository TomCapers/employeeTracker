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

connection.connect((err) => {
  if (err) throw err;
  console.log('is connected');
  
  start();
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
        'Add Department',
        'Update Role'
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
        case 'Update Role':
          roleUpdate();
          break;
        
      }
    });
};

const employeeSearch = () =>{
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        console.log(results);
        start();
})};

const roleSearch = () =>{
  connection.query('SELECT * FROM emp_role', (err, results) => {
      if (err) throw err;
      console.log(results);
      start();
})};

const departmentSearch = () =>{
  connection.query('SELECT * FROM department', (err, results) => {
      if (err) throw err;
      console.log(results);
      start();
})};

const employeeAdd = () =>{
  const manager = [];
  connection.query('SELECT manager_id FROM employee', (err, results)=> {
    manager.push(results);
  
    const roleId = [];
    connection.query('SELECT role_id FROM emp_role', (err, results)=> {
      roleId.push(results);


      inquirer
      .prompt([
        {
          name: 'id',
          type: 'input',
          message: 'Enter ID: '
        },
        {
          name: 'first',
          type: 'input',
          message: 'First Name: '
        },
        {
          name: 'last',
          type: 'input',
          message: 'Last Name: '
        },
        {
          name: "managerId",
          type: "rawlist",
          message: "What is the manager ID?",
          choices: manager
        },
        {
          name: "roleId",
          type: "rawlist",
          message: "What is the role ID?",
          choices: manager
        },
      ])
      .then((answer) => {
        const query = connection.query(
          'INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES ("${res.id}", "${res.first_name}", "${res.last_name}", "${res.manager_id}", "${res.role_id}")',
             
           (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} employee added!\n`);
           })})})})}
          
        


   

