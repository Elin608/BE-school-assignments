// Assignment 1:
type HelloFunction = (message: string) => void;
const showMessage: HelloFunction = (message) => {
    console.log(message);
};
const hello = (callback: HelloFunction): void => {
    callback("Hello from callback!");
};
hello(showMessage);




// Assignment 2:
type MessageCallback = (message: string) => void;

const sayHelloLater: MessageCallback = (message) => {
    console.log(message);
};

const helloLater = (callback: MessageCallback): void => {

    setTimeout(() => {
        callback("Hi, I am late!");
    }, 2000);
};
helloLater(sayHelloLater);


// Assignment 3:
type ResultCallback = (result: number) => void;
const calculate = (
    a: number,
    b: number,
    callback: ResultCallback): void => {
    const result = a + b;
    callback(result);
};
calculate(3, 3, (result) => {
    console.log(`The result is: ${result}`);
});

// Assignment 4:
type UppercaseCallBack = (message: string) => void;
const makeUppercase = (
    message: string,
    callback: UppercaseCallBack): void => {

    const uppercasedMessage = message.toUpperCase();

    callback(uppercasedMessage);
};
makeUppercase("hello world", (uppercasedMessage) => {
    console.log(uppercasedMessage);
});

// Assignment 5:
type OrderStatusFunction = (status: string) => void;



const orderStatus: OrderStatusFunction = (status) => {
    console.log(status);
};

const updateOrderStatus = (callback: OrderStatusFunction): void => {

    setTimeout(() => {
        callback("Your pizza is ready!");
    }, 3000);
};
updateOrderStatus(orderStatus);




































































































































































































































































































































































































