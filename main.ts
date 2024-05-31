#! /usr/bin/env node


import inquirer from "inquirer";

class Student {
    name: string;
    constructor(n: string) {
        this.name = n;
    }
}

class Person {
    student: Student[] = [];
    addStudent(obj: Student) {
        this.student.push(obj);
    }
}

const persons = new Person(); // Create Person instance outside the loop

const programStart = async (persons: Person) => { // Corrected parameter name
    console.log("Welcome!");
    do {
        const ans = await inquirer.prompt({
            name: "Select",
            type: "list",
            message: "Whom would you like to Interact with?",
            choices: ["staff", "student", "Exit"]
        });
        if (ans.Select == "staff") {
            console.log("You approach the staff rooms. Please feel free to ask any question.");
        } else if (ans.Select == "student") {
            const ans = await inquirer.prompt({
                name: "student",
                type: "input",
                message: "Enter the student's name you wish to engage"
            });
            const student = persons.student.find(val => val.name == ans.student);
            if (student) {
                console.log(`Hello, I am ${student.name}. Nice to see you again`);
                console.log("Existing student list:");
                console.log(persons.student);
            } else {
                const newStudent = new Student(ans.student);
                persons.addStudent(newStudent);
                console.log(`Hello, I am ${newStudent.name}. Nice to meet you.`);
                console.log("New student added.");
                console.log("Current student list:");
                console.log(persons.student);
            }
        } else if (ans.Select == "Exit") { // "exit" changed to "Exit" to match the list choice
            console.log("Exiting the program....");
            break; // Exit the loop when user selects "Exit"
        }
    } while (true); // Loop indefinitely until user chooses to exit
};

programStart(persons);

