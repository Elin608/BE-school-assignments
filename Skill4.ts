const wrapInArray = <T>(input:T):T=>{
    return input;

};
console.log(wrapInArray("cat"));
console.log(wrapInArray(10));







const firstItem = <T>(array:T[]):T=>{
    return array[0];
};
console.log(firstItem([1,2,3]));
console.log(firstItem(["a","b","c"]));