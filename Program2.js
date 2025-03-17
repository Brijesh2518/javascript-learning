// Create a Node.js  application to create A file, write A details A Student (Roll number, Name, Course, Fee)
//  and Read the content and display the contents

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const fileName = 'student.txt';

function writeStudentDetails() {
    rl.question('Enter Roll Number: ', (rollNumber) => {
        rl.question('Enter Name: ', (name) => {
            rl.question('Enter Course: ', (course) => {
                rl.question('Enter Fee: ', (fee) => {
                    const studentData = `
                    Roll Number: ${rollNumber}\n
                    Name: ${name}\n
                    Course: ${course}\n
                    Fee: ${fee}\n`;
                    fs.writeFile(fileName, studentData, (err) => {
                        if (err) {
                            console.error('Error writing to file:', err);
                        } else {
                            console.log('Student details saved successfully!');
                            readStudentDetails();
                        }
                    });
                });
            });
        });
    });
}

function readStudentDetails() {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            console.log('\nStudent Details:\n');
            console.log(data);
            console.log('--- Result: Student details successfully displayed ---');
        }
        rl.close();
    });
}

writeStudentDetails();
