# EmployeeManagementSystem
Node.js application to manage employees, departments, roles, job titles and salary

## Description
This application is a backend server application that uses node.js, MySQL2 and Inquirer package to navigate through the SQL database and tables tied to employee dependencies.  

## Installation
To install:  
1. Clone repo to your computer

## Usage
2. Once cloned Open a terminal and run "npm i" 
3. Update the .ENV file with your mysql password
4. In the terminal, run "mysql -uroot -p" 
5. While in the MySql terminal, run "source db/schema.sql;"
6. Next in the MySql terminal, run "source db/seed.sql;"
7. Last in the MySql terminal, run "use employees_db;" 
7. Exit the MySql terminal by typing "exit"
8. in the terminal, run "node server.js" 
9. Follow the prompts to update view/update employees, departments and roles.  

## License

There is no license for this application 

## User Story
AS A business owner <br>
I WANT to be able to view and manage the departments, roles, and employees in my company <br>
SO THAT I can organize and plan my business <br>

## Acceptance Criteria: 
GIVEN a command-line application that accepts user input <br>
WHEN I start the application <br>
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role <br>
WHEN I choose to view all departments <br>
THEN I am presented with a formatted table showing department names and department ids <br>
WHEN I choose to view all roles <br>
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role <br>
WHEN I choose to view all employees <br>
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to <br>
WHEN I choose to add a department <br>
THEN I am prompted to enter the name of the department and that department is added to the database <br>
WHEN I choose to add a role <br>
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database <br>
WHEN I choose to add an employee <br>
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database <br>
WHEN I choose to update an employee role <br>
THEN I am prompted to select an employee to update and their new role and this information is updated in the database <br>

## Screenshot of Application:  
Screenshot of application homepage <br>
<img src="assets\images\Picture1.PNG" alt="Picture Applicaton HomePage">

All Employee View <br>
<img src="assets\images\Picture2.PNG" alt="Picture All Employees">

Employees in Sawmill Operations Department <br>
<img src="assets\images\Picture3.PNG" alt="Picture Employees in Sawmill Operations">


## Credit 
- Text to ASCII generator used - https://fsymbols.com/generators/carty/

## Questions 
- Github profile - https://github.com/NBADRAUN
- For any questions, please email me at Nbadraun@gmail.com
