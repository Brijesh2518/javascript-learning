//write a javascript code to display name of those students who have secured grade s, grade will print according to the following rule if % students is 85 or above.
let students = [
    { name: "Alice", percentage: 90 },
    { name: "Bob", percentage: 82 },
    { name: "Charlie", percentage: 88 },
    { name: "David", percentage: 75 },
    { name: "Eve", percentage: 95 }
];
function getGradeSStudents(students) {
    return students.filter(student => student.percentage >= 85).map(student => student.name);
}
let gradeSStudents = getGradeSStudents(students);
console.log("Students who secured grade 'S':", gradeSStudents.join(", "));