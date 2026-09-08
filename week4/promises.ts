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


// Skill 2: Countdown Timer:
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

// Delayed Greeting:



const delayedGreeting = (name: string, delay: number, callback: () => void):
    void => {
    setTimeout(() => {

        console.log(`Hey ${name}, thanks for wating`);
        callback();
    }, delay);
};


delayedGreeting("Kilian", 1500, () => {
    console.log("Callback executed!");

});

// Skill 3: Temperature Converter:

type ConvertCallback = (celsius: number) => number;
const convertTemperature = (celsius: number, callback: ConvertCallback): number => {
    return callback(celsius)
};
const kelvin = convertTemperature(25, (celsius) => {
    return celsius + 1;
});
const fahrenheit = convertTemperature(25, (celsius) => {
    return celsius + 3
});
console.log(kelvin);
console.log(fahrenheit);


//Skill 4: Promises, Your Own Promises:

const inStock = true;
const checkStock = new Promise<string>((resolve, reject) => {
    console.log("Check stock");
    if (inStock) {
        resolve("The item is in stock");
    } else {
        reject("The iteam is out of stock")
    }
});
console.log("Promise created");

checkStock
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error)
    });

//Skill 5: A Different Advice Slip:

type adviceSlipType = {
    slip: {
        id: number;
        advice: string;
    };
};
const fetchAdviseAndLogin = (id: number): void => {
    fetch(`https://api.adviceslip.com/advice/${id}`)

        .then((response) => response.json())

        .then((data: adviceSlipType) => {
            console.log(`id: ${data.slip.id}, advice: ${data.slip.advice}`);

        })
        .catch((error) => {
            console.log("Error", error);

        });
};
fetchAdviseAndLogin(1);
fetchAdviseAndLogin(2);
fetchAdviseAndLogin(3);












