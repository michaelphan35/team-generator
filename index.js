import inquirer from 'inquirer';
//const render = require('./src/html.js');
import Engineer from './lib/Engineer.js';
import Intern from './lib/Intern.js';
import Manager from './lib/Manager.js';
import fs from 'fs';
import render from "./src/htmloutput.js"
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import path from 'path';
const htmlDirectory = path.resolve(__dirname, 'dist');
const htmlCreator = path.join(htmlDirectory, 'team.html');


// Creates empty arrays where answers can be pushed to afterwards //

const teamMembers = [];
const idArray = [];


// Creates questions that inquirer will pull from for both engineers and interns //
const questions = {
    Engineer: [
        {
            type: "input",
            name: "engineerName",
            message: "What is the employee's name?",
            validate: answer => {
                if (answer !==''){
                    return true;
                } else {
                    return 'Please enter a valid name!';
                }
            }
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is the employee's ID number?",
            validate: answer => {
                const pass = answer.match(/^([1-9][0-9]{0,1})$/);
                
                if (pass) {
                    if(idArray.includes(answer)) {
                        return "This id number is used. Please enter and differert ID."
                    } else {
                        return true;
                    }
                }
                return "Please enter an ID number from 1-99.";
            }
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the employee's email address?",
            validate: answer => {
                const pass = answer.match(/\S+@\S+\.\S+/);

                if (pass) {
                    return true;
                } else {
                    return "Please enter a valid email!";
                }
            }
        },
        {
            type: "input",
            name: "engineerGit",
            message: "Please enter the employee's Github.",
            validate: answer => {
                if(answer !== "") {
                    return true;
                } else {
                    return "Please enter a valid Github username!";
                }
            }
        },
        {
            type: "list",
            name: "addAnother",
            message: "Would you like to add another employee?",
            choices: ["yes", "no"]
        },
    ],

    Intern: [
        {
            type: "input",
            name: "internName",
            message: "What is the employee's name?",
            validate: answer => {
                if (answer !==''){
                    return true;
                } else {
                    return 'Please enter a valid name!';
                }
            }
        },
        {
            type: "input",
            name: "internId",
            message: "What is the employee's ID number?",
            validate: answer => {
                const pass = answer.match(/^([1-9][0-9]{0,1})$/);
                
                if (pass) {
                    if(idArray.includes(answer)) {
                        return "This id number is used. Please enter and differert ID."
                    } else {
                        return true;
                    }
                }
                return "Please enter an ID number from 1-99.";
            }
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the employee's email address?",
            validate: answer => {
                const pass = answer.match(/\S+@\S+\.\S+/);

                if (pass) {
                    return true;
                } else {
                    return "Please enter a valid email!";
                }
            }
        },
        {
            type: "input",
            name: "internSchool",
            message: "Please enter the employee's current school.",
            validate: answer => {
                if(answer !== "") {
                    return true;
                } else {
                    return "Please enter a valid school name!";
                }
            }
        },
        {
            type: "list",
            name: "addAnother",
            message: "Would you like to add another employee?",
            choices: ["yes", "no"]
        },
    ]
};

// Create function for Manager when they first load the application //
function createManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "Please enter your name.",
            validate: answer => {
                if(answer !== "") {
                    return true;
                } else {
                    return "Please enter a valid name!";
                }
            }
        },
        {
            type: "input",
            name: "managerId",
            message: "Please enter your ID number.",
            validate: answer => {
                const pass = answer.match(/^([1-9][0-9]{0,1})$/);
                
                if(pass){
                    return true;
                } else {
                    return "Please enter a valid ID number!";
                }
            }
        },
        {
            type: "input",
            name: "managerEmail",
            message: "Please enter your email address.",
            validate: answer => {
                const pass = answer.match(/\S+@\S+\.\S+/);

                if(pass) {
                    return true;
                } else {
                    return "Please enter a valid email address!";
                }
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Please enter an office number.",
            validate: answer => {
                const pass = answer.match(/^([1-9][0-9]{0,1})$/);

                if(pass) {
                    return true;
                } else {
                    return "Please enter a valid office number!";
                }
            }
        }
    ])
    .then(answer => {
        const manager = new Manager (answer.managerName, answer.managerId, answer.managerEmail, answer.OfficeNumber);
        teamMembers.push(manager);
        idArray.push(answer.managerId);
        addEmployee();
    })
};

// Prompt for choosing which type of member the manager wants to add//

const chooseMember = [
    {
        type: "list",
        name: "employeeJob",
        message: "What job would you like to add?",
        choices: ["Engineer", "Intern"]
    }
];

// Function to add employee based on Manager's choices //

function addEmployee() {
    inquirer.prompt(chooseMember)
        .then(answer => {
            if (answer.employeeJob === "Engineer") {
                inquirer.prompt(questions.Engineer)
                    .then(answer => {
                        const engineer = new Engineer (answer.engineerName, answer.engineerId, answer.engineerEmail, answer.engineerGit);
                        teamMembers.push(engineer);
                        idArray.push(answer.engineerId);
                        if (answer.addAnother === "yes") {
                            addEmployee();
                        } else {
                            createHTML();
                        };
                    });
            } else if (answer.employeeJob === "Intern") {
                inquirer.prompt(questions.Intern)
                    .then (answer => {
                        const intern = new Intern (answer.internName, answer.internId, answer.internEmail, answer.internSchool);
                        teamMembers.push(intern);
                        idArray.push(answer.internId);
                        if (answer.addAnother === "yes") {
                            addEmployee();
                        } else {
                            createHTML();
                        }
                    })
            }
        })
}

// Calls create manager function //

createManager();

// Function for writing HTML file //

function createHTML () {
    if(!fs.existsSync(htmlCreator)) {
        fs.writeFileSync(htmlCreator, render(teamMembers), "utf-8");
    }
}
