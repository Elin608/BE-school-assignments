// const firstName: string = "Kilian";
// const age: number = 17;
// const isEnrolled = true;

// const describeStudent = (firstName: string, age: number) => {
//     return `${firstName} is ${age} years old. `;
// }
// console.log(describeStudent(firstName, age));


// const formatGreeting = (name: string, formal?: boolean) => {
//     if (formal) {
//         return `Good day, ${name}`;
//     } 
//     return `Hi, ${name}`;
// }
// console.log(formatGreeting("Kilian"));

const ages :number []= [2,20,5,40,100]
const agesInFiveYears=ages.map(age=> age+10);
console.log(agesInFiveYears);

const names:string [] = ["Kilian", "Leana", "Cleo" ,"Hero", "Wio"];
const shortNames = names.filter((names) =>names.length<=4);
console.log(shortNames);
