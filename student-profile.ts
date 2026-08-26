const firstName: string = "Kilian";
const age: number = 17;
const isEnrolled = true;

const describeStudent = (firstName: string, age: number) => {
    return `${firstName} is ${age} years old. `;
}
console.log(describeStudent(firstName, age));


const formatGreeting = (name: string, formal?: boolean) => {
    if (formal) {
        return `Good day, ${name}`;
    }
    return `Hi, ${name}`;
}
console.log(formatGreeting("Kilian", true));
