///// Required modules /////
require( 'dotenv' ).config();
const inquirer = require( 'inquirer' );
const mysql = require( 'mysql2' );
const util = require( 'util' );
const questions = require( './assets/questions' );
const queries = require( './assets/queries' );
const sequelize = require('./config/connection');
const chalk = require('chalk');
const { color, log, red, green, cyan, cyanBright } = require('console-log-colors');


// Create DB connection to the employees_db // 
const db = mysql.createConnection(
	{
		host: 'localhost',
		user: 'root',
		password: process.env.DB_PASSWORD,
		database: 'employees_db'
	},
);

///////////// Helper Functions //////////////

		// Make queries promises // 
		db.query = util.promisify( db.query );

		// Display data as a table in the terminal // 
		const tableData = ( table ) => {
			console.log( '\n' );
			console.table( table );
			console.log( '\n' );
		};

		// Builds Inquiror list of options based on the query run // 
		const BuildoptionsList = ( message, name, objArray ) => {
			return {
				type: 'list',
				message: message,
				name: name,
				choices: objArray
			};
		};



//////////////// Update Data Functions ///////////////


	// Add Department to database // 
		const addDepartment = () => {
			inquirer
				.prompt( questions.addDepartment )
				.then( async ( addDepartmentAnswer ) => {
					const deptName = addDepartmentAnswer.name;
					try {
						await db.query( queries.insertDepartment, deptName );
						console.log( red(`Added ${deptName}`));
						return mainMenu();
					} catch ( err ) {
						console.log( err );
					}
				} );
		};

	// Delete Department //
		const deleteDepartment = async () => {
			let DepartmenttoDelete = [];
			try {
				const table = await db.query( queries.departments );
				let deptArray = table.map( dept => ( {
					name: dept.name,
					value: dept.id
				} ) );
				DepartmenttoDelete.push( BuildoptionsList( 'Select a Department:', 'department', deptArray ) );
			} catch ( err ) {
				console.log( err );
			}
			inquirer
				.prompt( DepartmenttoDelete )
				.then( async ( selectedDepartment ) => {
					const department = selectedDepartment.department;
					try {
						await db.query( queries.delete( 'department' ), department );
						console.log( red('Department deleted'));
						return mainMenu();
					} catch ( err ) {
						console.log( err );
					}
				} );
		};

	// Add Role // 
		const addRole = async () => {
			try {
				const deptTable = await db.query( queries.departments );
				let deptArray = deptTable.map( dept => ( {
					name: dept.name,
					value: dept.id
				} ) );
				questions.addRole.push( BuildoptionsList( 'Select Department for Role', 'department', deptArray ) );
			} catch ( err ) {
				console.log( err );
			}
			inquirer
				.prompt( questions.addRole )
				.then( async ( addRoleAnswers ) => {
					const { title, salary, department } = addRoleAnswers;
					try {
						await db.query( queries.insertRole, [title, salary, department] );
						console.log( red(`Added ${title} to the database.`));
						return mainMenu();
					} catch ( err ) {
						console.log( err );
					}
				} );
		};

	// Delete role //
		const deleteRole = async () => {
			let roletoDelete = [];
			try {
				const table = await db.query( queries.roles );
				let roleArray = table.map( role => ( {
					name: role.title,
					value: role.id
				} ) );
				roletoDelete.push( BuildoptionsList( 'Select a Role:', 'role', roleArray ) );
			} catch ( err ) {
				console.log( err );
			}
			inquirer
				.prompt( roletoDelete )
				.then( async ( choosenRole ) => {
					const role = choosenRole.role;
					try {
						await db.query( queries.delete( 'role' ), role );
						console.log( red('Role Deleted.'));
						return mainMenu();
					} catch ( err ) {
						console.log( err );
					}
				} );
		};

	// Add Employee // 
		const addEmployee = async () => {
			try {
				const roleTable = await db.query( queries.roles );
				let roleArray = roleTable.map( role => ( {
					name: role.title,
					value: role.id
				} ) );
				questions.addEmployee.push( BuildoptionsList( 'Select Employee Role:', 'role', roleArray ) );
			} catch ( err ) {
				console.log( err );
			}
			try {
				const managerTable = await db.query( queries.managers );
				let managerArray = managerTable.map( manager => ( {
					name: manager.name,
					value: manager.id
				} ) );
				managerArray.push( {
					name: 'No Manager',
					value: null
				} );
				questions.addEmployee.push( BuildoptionsList( 'Select Manager:', 'manager', managerArray ) );
			} catch ( err ) {
				console.log( err );
			}
			inquirer
				.prompt( questions.addEmployee )
				.then( async ( addEmployeeAnswers ) => {
					const { last_name, first_name, role, manager } = addEmployeeAnswers;
					try {
						await db.query( queries.insertEmployee, [last_name, first_name, role, manager] );
						console.log( red(`Added ${first_name} ${last_name} to the database.`));
						return mainMenu();

					} catch ( err ) {
						console.log( err );
					}
				} );
		};

	// Update employee's role
		const updateRole = async () => {
			let employeeroletoUpdate = [];
			try {
				const employeeTable = await db.query( queries.employeesByRole );
				let employeeArray = employeeTable.map( employee => ( {
					name: employee.name,
					value: employee.id
				} ) );
				employeeroletoUpdate.push( BuildoptionsList( 'Select Employee:', 'employee', employeeArray ) );

			} catch ( err ) {
				console.log( err );
			}
			try {
				const roleTable = await db.query( queries.roles );

				let roleArray = roleTable.map( role => ( {
					name: role.title,
					value: role.id
				} ) );
				employeeroletoUpdate.push( BuildoptionsList( 'Select new role:', 'role', roleArray ) );

			} catch ( err ) {
				console.log( err );
			}
			inquirer
				.prompt( employeeroletoUpdate )
				.then( async ( updateEmployeeAnswers ) => {
					const { role, employee } = updateEmployeeAnswers;
					try {
						await db.query( queries.updateEmployee( 'role' ), [role, employee] );
						console.log(red('Updated employees role.'));
						return mainMenu();
					} catch ( err ) {
						console.log( err );
					}
				} );
		};

	// Update employee's manager //
		const updateManager = async () => {
			let managerupdateList = [];
			try {
				const employeeTable = await db.query( queries.employeesByRole );
				let employeeArray = employeeTable.map( employee => ( {
					name: employee.name,
					value: employee.id
				} ) );
				managerupdateList.push( BuildoptionsList( 'Select Employee:', 'employee', employeeArray ) );
				managerupdateList.push( BuildoptionsList( 'Select a New Manager:', 'manager', employeeArray ) );

			} catch ( err ) {
				console.log( err );
			}
			inquirer
				.prompt( managerupdateList )
				.then( async ( updateEmployeeAnswers ) => {
					let { manager, employee } = updateEmployeeAnswers;
					if( manager === employee ) {
						manager = null;
					}
					try {
						await db.query( queries.updateEmployee( 'manager' ), [manager, employee] );
						console.log( red('Updated employees Manager'),);
						return mainMenu();
					} catch ( err ) {
						console.log( err );
					}
				} );
		};

	// Delete Employee // 
		const deleteEmployee = async () => {
			let employeetoDelete = [];
			try {
				const table = await db.query( queries.employeesByRole );
				let employeeArray = table.map( employee => ( {
					name: employee.name,
					value: employee.id
				} ) );
				employeetoDelete.push( BuildoptionsList( 'Select Employee:', 'employee', employeeArray ) );
			} catch ( err ) {
				console.log( err );
			}
			inquirer
				.prompt( employeetoDelete )
				.then( async ( choosenEmployee ) => {
					const employee = choosenEmployee.employee;
					try {
						await db.query( queries.delete( 'employee' ), employee );
						console.log( red('Employee Deleted'));
						return mainMenu();
					} catch ( err ) {
						console.log( err );
					}
				} );
		};

	



////////////////// Table View Functions ////////////////

	// Department Table Data // 
	const departmenttableData = async () => {
		try {
			const table = await db.query( queries.departments );
			tableData( table );
			return mainMenu();
		} catch ( err ) {
			console.log( err );
		}
	};

	// View Role with Department Data Table // 
	const roletableData = async () => {
		try {
			const table = await db.query( queries.roles );
			tableData( table );
			return mainMenu();
		} catch ( err ) {
			console.log( err );
		}
	};
	// Budget by Department Table Data //
	const budgettableData = async () => {
		let selectDepartment = [];
		try {
			const table = await db.query( queries.departments );
			let deptArray = table.map( dept => ( {
				name: dept.name,
				value: dept.id
			} ) );
			selectDepartment.push( BuildoptionsList( 'Select Department:', 'department', deptArray ) );
		} catch ( err ) {
			console.log( err );
		}
		inquirer
			.prompt( selectDepartment )
			.then( async ( choosenDepartment ) => {
				const department = choosenDepartment.department;
				try {
					const budgetTable = await db.query( queries.budget, department );
					if( budgetTable[0].department === null ) {
						console.log( red('No Employees in This Department'));
					} else {
						tableData( budgetTable );
					}
					return mainMenu();
				} catch ( err ) {
					console.log( err );
				}
			} );
	};


	// table data with employee, department and role // 
	const selectEmployeeTable = async () => {
		try {
			const table = await db.query( queries.employees() );
			tableData( table );
			return mainMenu();
		} catch ( err ) {
			console.log( err );
		}
	};

	// table data with employee, manager, department and role // 
	const employeeandmanagertableData = async () => {
		let chooseEmployeeManagerQuestions = [];
		try {
			const managerTable = await db.query( queries.managers );
			let managerArray = managerTable.map( manager => ( {
				name: manager.name,
				value: manager.id
			} ) );
			chooseEmployeeManagerQuestions.push( BuildoptionsList( 'Select Manager:', 'manager', managerArray ) );
		} catch ( err ) {
			console.log( err );
		}
		inquirer
			.prompt( chooseEmployeeManagerQuestions )
			.then( async ( managerChoice ) => {
				const manager = managerChoice.manager;
				try {
					const table = await db.query( queries.employeesByManager(), manager );
					if( table.length === 0 ) {
						console.log( red('Manager has No Employees'));
					} else {
						tableData( table );
					}
					return mainMenu();
				} catch ( err ) {
					console.log( err );
				}
			} );
	};

	// table data with employee, department and role// 
		const employeeanddepartmenttableData = async () => {
			let chooseEmployeeDepartmentQuestions = [];
			try {
				const deptTable = await db.query( queries.departments );
				let deptArray = deptTable.map( dept => ( {
					name: dept.name,
					value: dept.id
				} ) );
				chooseEmployeeDepartmentQuestions.push( BuildoptionsList( 'Select Department:', 'department', deptArray ) );
			} catch ( err ) {
				console.log( err );
			}
			inquirer
				.prompt( chooseEmployeeDepartmentQuestions )
				.then( async ( departmentChoice ) => {
					const department = departmentChoice.department;
					try {
						const table = await db.query( queries.employeesByDepartment(), department );
						if( table.length === 0 ) {
							console.log( red('No Employees in this Department'));
						} else {
							tableData( table );
						}
						return mainMenu();
					} catch ( err ) {
						console.log( err );
					}
				} );
		};

/////////////////////// Menus //////////////////////////

	// Department Menu // 
	const DepartmentMenu = () => {
		inquirer
			.prompt( questions.department )
			.then( ( departmentAnswer ) => {
				switch( departmentAnswer.action ) {
				case 'View All Departments':
					return departmenttableData();
				case 'View Department Budget':
					return budgettableData();
				case 'Add Department':
					return addDepartment();
				case 'Delete Department':
					return deleteDepartment();
				}
			} );
	};

// Role Menu // 
	const roleMenu = () => {
		inquirer
			.prompt( questions.role )
			.then( ( roleAnswer ) => {
				switch( roleAnswer.action ) {
				case 'View Roles':
					return roletableData();
				case 'Add Role':
					return addRole();
				case 'Delete Role':
					return deleteRole();
				}
			} );
	};

// Employee Menu // 
	const askForEmployeeAction = () => {
		inquirer
			.prompt( questions.employee )
			.then( ( employeeAnswer ) => {
				switch( employeeAnswer.action ) {
				case 'View Employees':
					return selectEmployeeTable();
				case 'View Employees by Manager':
					return employeeandmanagertableData();
				case 'View Employees by Department':
					return employeeanddepartmenttableData();
				case 'Update Employee Role':
					return updateRole();
				case 'Update Employee Manager':
					return updateManager();
				case 'Add Employee':
					return addEmployee();
				case 'Delete Employee':
					return deleteEmployee();
				}
			} );
	};

// Main Menu // 
	const mainMenu = () => {
		inquirer
			.prompt( questions.category )
			.then( ( categoryAnswer ) => {
				switch( categoryAnswer.category ) {
				case 'Employees':
					return askForEmployeeAction();
				case 'Departments':
					return DepartmentMenu();
				case 'Roles':
					return roleMenu();
				case 'Exit':
					console.log(chalk.greenBright`
			
				













































				░██████╗░░█████╗░░█████╗░██████╗░██████╗░██╗░░░██╗███████╗██╗
				██╔════╝░██╔══██╗██╔══██╗██╔══██╗██╔══██╗╚██╗░██╔╝██╔════╝██║
				██║░░██╗░██║░░██║██║░░██║██║░░██║██████╦╝░╚████╔╝░█████╗░░██║
				██║░░╚██╗██║░░██║██║░░██║██║░░██║██╔══██╗░░╚██╔╝░░██╔══╝░░╚═╝
				╚██████╔╝╚█████╔╝╚█████╔╝██████╔╝██████╦╝░░░██║░░░███████╗██╗
				░╚═════╝░░╚════╝░░╚════╝░╚═════╝░╚═════╝░░░░╚═╝░░░╚══════╝╚═╝







				
		
				
				`);
				return db.end();
			}
		} );
};

const Splash = ()=> {

	console.log(chalk.greenBright`
	























	░██████╗░█████╗░░██╗░░░░░░░██╗███╗░░░███╗██╗██╗░░░░░██╗░░░░░
	██╔════╝██╔══██╗░██║░░██╗░░██║████╗░████║██║██║░░░░░██║░░░░░
	╚█████╗░███████║░╚██╗████╗██╔╝██╔████╔██║██║██║░░░░░██║░░░░░
	░╚═══██╗██╔══██║░░████╔═████║░██║╚██╔╝██║██║██║░░░░░██║░░░░░
	██████╔╝██║░░██║░░╚██╔╝░╚██╔╝░██║░╚═╝░██║██║███████╗███████╗
	╚═════╝░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝░░░░░╚═╝╚═╝╚══════╝╚══════╝
	
	███████╗███╗░░░███╗██████╗░██╗░░░░░░█████╗░██╗░░░██╗███████╗███████╗
	██╔════╝████╗░████║██╔══██╗██║░░░░░██╔══██╗╚██╗░██╔╝██╔════╝██╔════╝
	█████╗░░██╔████╔██║██████╔╝██║░░░░░██║░░██║░╚████╔╝░█████╗░░█████╗░░
	██╔══╝░░██║╚██╔╝██║██╔═══╝░██║░░░░░██║░░██║░░╚██╔╝░░██╔══╝░░██╔══╝░░
	███████╗██║░╚═╝░██║██║░░░░░███████╗╚█████╔╝░░░██║░░░███████╗███████╗
	╚══════╝╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚══════╝╚══════╝
	
	██████╗░░█████╗░████████╗░█████╗░██████╗░░█████╗░░██████╗███████╗
	██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝
	██║░░██║███████║░░░██║░░░███████║██████╦╝███████║╚█████╗░█████╗░░
	██║░░██║██╔══██║░░░██║░░░██╔══██║██╔══██╗██╔══██║░╚═══██╗██╔══╝░░
	██████╔╝██║░░██║░░░██║░░░██║░░██║██████╦╝██║░░██║██████╔╝███████╗
	╚═════╝░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝╚═════╝░╚═╝░░╚═╝╚═════╝░╚══════╝
	
	`
	); 
	console.log(chalk.greenBright(`
	
	         Your Handy, Dandy Employee Database System!
			 
			 
			 `	
	
			 ));	
}; 


const load = async() =>{
	const loadscreen = Splash();  
	const Menu = mainMenu(); 

}

load(); 