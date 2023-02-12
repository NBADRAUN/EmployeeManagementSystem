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

}

load(); 