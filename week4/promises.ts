// Skill 1: Callbacks & Functions Types:
type OrderCallback = () => void;
const placeOrder = (item: string, callBack: OrderCallback): void => {
    console.log(`Order placed for ${item}`);
    callBack()
};
placeOrder("Pizza", () => {
    console.log("Thanks for your order!");
});

// Sum with a Named Type:
type SumCallback = (result: number) => void;
const sumNumbers = (a: number, b: number, callBack: SumCallback): void => {
    const result = a + b;
    callBack(result);
};
sumNumbers(2, 3, (result) => {
    console.log("Result is:", result);
});

// Challenge: Callback with Multiple Parameters:
type CompareCallback = (a: number, b: number) => string;

const compareNumbers = (a: number, b: number, callBack: CompareCallback): string => {
    return callBack(a, b);
};

const compareSize = (a: number, b: number): string => {
    if (a > b) return "a is bigger";
    if (a < b) return "b is bigger";
    return "equal";
};
console.log(compareNumbers(100, 1, compareSize));
console.log(compareNumbers(1, 100, compareSize));

// Skill 2: Asynchronous Callbacks: 
// "After countdown" runs before "Time´s up" because setTimeout waits 3 seconds.
console.log("Before countdown");
type countDownCallback = () => void;

const countDown = (seconds: number, callback: () => void): void => {
    setTimeout(() => {

        console.log("Time´s up!");
        callback();
    }, seconds * 1000);
};
countDown(3, () => {
    console.log("Countdown finished.");
});

console.log("After countdown");







