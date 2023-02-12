const { color, log, red, green, cyan, cyanBright } = require('console-log-colors');



// Main Menu // 
const questions = {
    category: [
        {
            type: 'list',
            message: green('Select a Category:'),
            name: 'category',
            choices: [
                'Employees',
                'Departments',
                'Roles',
                'Exit'
            ]
        }
    ],

// Employee Menu // 

employee: [
    {
        type: 'list',
        message: green('Select an Action:'),
        name: 'action',
        choices: [
            'View Employees',
            'View Employees by Manager',
            'View Employees by Department',
            'Update Employee Role',
            'Update Employee Manager',
            'Add Employee',
            'Delete Employee'
        ]
    }
],

addEmployee: [
    {
        type: 'input',
        message: green('Enter Last Name:'),
        name: 'last_name',
    },
    {
        type: 'input',
        message: green('Enter First Name:'),
        name: 'first_name',
    },

],


// Department Menu // 

department: [
    {
        type: 'list',
        message: green('Select an Action:'),
        name: 'action',
        choices: [
            'View All Departments',
            'View Department Budget',
            'Add Department',
            'Delete Department'
        ]
    }
],

addDepartment: [
    {
        type: 'input',
        message: green('Enter Department Name:'),
        name: 'name',
    }
],

// Roles Menu // 

role: [
        {
            type: 'list',
            message: green('Select an Action:'),
            name: 'action',
            choices: [
                'View Roles',
                'Add Role',
                'Delete Role'
            ]
        }
    ],

addRole: [
        {
            type: 'input',
            message: 'What is the title of the new role?',
            name: 'title',
        },
        {
            type: 'input',
            message: 'What is the salary for the new role?',
            name: 'salary',
        }
    ],

};

module.exports = questions;