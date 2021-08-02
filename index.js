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
      switch (answer.action) {
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
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        const table = cTable.getTable(res);
        console.log(table);
        start();
})};

const roleSearch = () =>{
  connection.query('SELECT * FROM emp_role', (err, res) => {
      if (err) throw err;
      const table = cTable.getTable(res)
      console.log(table);
      start();
})};

const departmentSearch = () =>{
  connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      const table = cTable.getTable(res)
      console.log(table);
      start();
})};

const employeeAdd = () =>{
      inquirer
      .prompt([
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
          type: "input",
          message: "What is the manager ID?",
          choices: manager
        },
        {
          name: "roleId",
          type: "input",
          message: "What is the role ID?",
          choices: manager
        },
      ])
      .then((answer) => {
        connection.query(
          'INSERT INTO employees SET ?', 
          {
            first_name: answer.first,
            last_name: answer.last,
            manager_id: answer.managerId,
            role_id: answer.roleId,
          },
          (err) => {
              if (err) throw err;
              console.log(`You have added, ${answer.firstname} ${answer.lastname}.`);
              
              start();
          }
      );
  });
};

const roleAdd = () =>{
  inquirer
  .prompt([
      {
          name: 'title',
          type: 'input',
          message: "Enter the new role title:",
      },
      {
          name: 'salary',
          type: 'input',
          message: 'Please enter the salary for this role:',
      },
      {
          name: 'deptId',
          type: 'input',
          message: 'Please enter the Department ID for this role:',
      }
  ])
  .then((answer) => {
      connection.query(
          'INSERT INTO emp_role SET ?',//
          {
              title: answer.title,
              salary: answer.salary,
              department_id: answer.deptId,
          },
          (err) => {
              if (err) throw err;
              console.log(`The role "${answer.title}" has been added.`);
              start();
          });
  });
};
          
        


   

