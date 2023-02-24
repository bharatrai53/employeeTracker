
// Import and require mysql2
const mysql = require('mysql2');
const { prompt } = require('inquirer');


init()

function init() {
  loadInitialQuestions()
}

function loadInitialQuestions() {
  prompt([
    {
      type: "list",
      name: "action",
      message: ' What would you like to do?',
      choices: [
        {
          name: "View all Departments",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "Add a Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "View all Roles",
          value: "VIEW_ROLE"
        },
        {
          name: "Add a Role",
          value: "ADD_ROLE"
        },
        {
          name: "View Employee",
          value: "VIEW_EMPLOYEE"
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE"
        }
      ]
    }
  ])
    .then(choice => {
      console.log(choice)
      switch (choice.action) {
        case "VIEW_DEPARTMENTS":
          viewDepartments()
          break;
        case "ADD_DEPARTMENT":
          addDepartment()
          break;
        case "VIEW_ROLE":
          viewRole()
          break;
        case "ADD_ROLE":
          addRole()
          break;
        case "VIEW_EMPLOYEE":
          viewEmployees()
          break;
        case "ADD_EMPLOYEE":
          addEmployee()
          break;

        default:
          break;
      }
    })
}

function viewDepartments() {
  db.promise().query('SELECT * FROM department').then(([res]) => {
    console.table(res);
    loadInitialQuestions();
  });
}

function addDepartment() {
  prompt({ type: 'input', name: 'departmentName', message: 'Enter Department Name' })
    .then(answer => {
      db.promise().query(`INSERT INTO department (dept_name) VALUES ('${answer.departmentName}')`)
        .then(([res]) => {
          if (res.affectedRows > 0) {
            viewDepartments();
          }
          else {
            console.log('Failed to add');
            loadInitialQuestions();
          }
        });
    })
}
function viewRoles() {
  db.promise().query('SELECT * FROM role').then(([res]) => {
    console.table(res);
    loadInitialQuestions();
  });
}
function addRole() {
  prompt({type: 'input', name: 'roleName', message: 'Enter Role Name'})
  .then(answer => {
    db.promise().query(`INSERT INTO role (title) VALUES ('${answer.roleName}')`)
    .then(([res]) => {
      if (res.affectedRows > 0){
        viewRoles();
      }
      else {
        console.log('Failed to add');
        loadInitialQuestions();
      }
    });
  })
}

function viewEmployees() {
  db.promise().query('SELECT * FROM employee').then(([res]) => {
    console.table(res);
    loadInitialQuestions();
  });
}
function addEmployee() {
  prompt({type: 'input', name: 'employeeName', message: 'Enter Employee Name'} )
  .then(answer => {
    db.promise().query(`INSERT INTO employee (first_name) VALUES ('${answer.first_name}')`)
    .then(([res]) => {
      if (res.affectedRows > 0){
        viewRoles();
      }
      else {
        console.log('Failed to add');
        loadInitialQuestions();
      }
    }).catch(error => {
      console.log(error);
      loadInitialQuestions();
    });
  })
}



const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '#Basketball53',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

