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

// const ages :number []= [2,20,5,40,100]
// const agesInFiveYears=ages.map(age=> age+10);
// console.log(agesInFiveYears);

// const names:string [] = ["Kilian", "Leana", "Cleo" ,"Hero", "Wio"];
// const shortNames = names.filter((names) =>names.length<=4);
// console.log(shortNames);
// const scores:number[]=[60,82,20,14,12,4,66,23]

// const highScore=scores.filter((scores)=> scores >=50);
// console.log(highScore);

// const grades = highScore.map((score) =>  
// score >= 80? "A":
// score>= 70? "B":
// score>= 60? "C": "F"

// );
// console.log(grades); 

// const failed = scores.filter ((score) =>score<50);
// console.log(failed.length);

// interface Book {
//     title: string,
//     author: string,
//     pages: number,
// }
// const myBook:Book= {
//     title: "The Housemaid",
//     author: "Freida McFadden",
//     pages: 328,

// }
// console.log(myBook.title);
// interface Adress{
//     city:string;
//     postalCode?:string;
// }
// interface Person{
//     name:string;
//     age:number;
//     adress:Adress;
// }
// const person1:Person = {
//     name: "Johanna",
//     age:10,
//     adress:{
//         city: "Madrid",
//         postalCode: "03189"
//     }
// }
// const person2:Person ={
//     name:"Joakim",
//     age:12,
//     adress:{
//         city: "Alicante",
//         postalCode: "031222",
//     }
// }
// console.log(person1.adress.city); 

// interface Movie {
//     id: number;
//     title: string;
//     rating: number;
//     geners: string[];

// }
// const movies: Movie[] = [

//        {id: 1,
//         title: "Moana",
//         rating: 10,
//         geners: ["Disney"]},


//         {id: 2,
//         title: "Hello",
//         rating: 100,
//         geners: ["Thriller"]},

//         {id: 3,
//         title: "GoodBye",
//         rating: 2,
//         geners: ["Romance"]},


//         {id: 4,
//         title: "Hero",
//         rating: 88,
//         geners: ["Disney"]}


// ];

// function getMoviesByGenre(movies: Movie[], genre: string):
//     Movie[] {
//     return movies.filter((movie) =>
//         movie.geners.includes(genre)
//     );
// }
// console.log(getMoviesByGenre ( movies, "Disney"));

interface Product {
    id: number;
    name: string;
    price: number;
    tags: string[];
}
const products: Product[] = [

    {
        id: 1,
        name: "pink",
        price: 900,
        tags: ["hahaha"]
    },


    {
        id: 2,
        name: "green",
        price: 2000,
        tags: ["ha"]
    },

    {
        id: 3,
        name: "blue",
        price: 300,
        tags: ["work"]
    },

    {
        id: 4,
        name: "yellow",
        price: 7000,
        tags: ["work"]
    },

    {
        id: 5,
        name: "brown",
        price: 9000,
        tags: ["work"]
    },




];
const cheapProducts = products.filter((product) =>
    product.price < 1000);
console.log(cheapProducts);

const workProducts=products.filter((product)=>
    product.tags.includes("work"))
.map((product)=>product.name);

console.log(workProducts);









































