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
      name: 'listoption',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View Employees',
        'View Roles',
        'View Departments',
        'Add Employee',
        'Add Role',
        'Add Department',
        'Update Role',
        'Exit'
      ],
    })
    .then((answer) => {
      switch (answer.listoption) {
        case 'View Employees':
          return employeeSearch();
        case 'View Roles':
          return roleSearch();
        case 'View Departments':
          return departmentSearch();
        case 'Add Employee':
          return employeeAdd();
        case 'Add Role':
          return roleAdd();
        case 'Add Department':
          return departmentAdd();
        // case 'Update Role':
        //   roleUpdate();
        case 'Exit':
            connection.end();
        
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
          name: "roleId",
          type: "input",
          message: "What is the role ID?",
          choices: manager
        },
        {
          name: "managerId",
          type: "input",
          message: "What is the manager ID?",
          choices: manager
        },
      ])
      .then((answer) => {
        connection.query(
          'INSERT INTO employees SET ?', 
          {
            first_name: answer.first,
            last_name: answer.last,
            role_id: answer.roleId,
            manager_id: answer.managerId,
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

const departmentAdd = () => {
  inquirer
  .prompt({
      name: 'newDept',
      type: 'input',
      message: "Please enter the new department name:",
  })
  .then((answer) => {
      connection.query(
          'INSERT INTO department SET ?',
      {
          name: answer.newDept,
      },
      (err) => {
          if (err) throw err;
          console.log(`You have added the "${answer.newDept}" department.`);
          start(); 
      }
      );
  })
};
        


   

