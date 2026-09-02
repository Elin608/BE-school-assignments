type Result = true | false;
const printResult = (result:Result)=>{
    if(result){
        console.log("Pass");
    } else {
        console.log("Fail")};

    }
    console.log(printResult(true));
     console.log(printResult(false));
