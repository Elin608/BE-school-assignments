// challenge1
type Result = true | false;
const printResult = (result: Result): string => {
    return result ? "Pass" : "Fail";
};
console.log(printResult(true));
console.log(printResult(false));

// challenge2
interface Car{
    brand:string;
    year:number;
}
const printCar =(car:Car):string=>{
    return "(Brand:" + car.brand + "Year:" + car.year +")";
};


console.log(printCar({
    brand: "Toyota",
    year:2022,
}));
