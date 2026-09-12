// Task 1: Coin Flip:
async function playGame() {
    try {
        const result = await flipCoin();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
const flipCoin = () => {
    return new Promise((resolve, reject) => {
        const outcome = Math.random() > 0.5;
        outcome ? resolve("You win!") : reject("You lose!");
    });
};
playGame();

// Task 2:Resolve or Reject:

async function handlePromise() {
    try {
        const result = await myPromise;
        console.log(result)

    } catch (error) {
        console.log(error)
    }
}
handlePromise();

const myPromise = new Promise((resolve, reject) => {
    const succsess = true;

    if (succsess) {
        resolve("Resolved operation succsessfully!");

    } else {
        reject("Resolved operation rejected");
    }
});
console.log(myPromise);

//Task 3:Delayed Messege:
async function showMessage() {
    try {
        const result = await delayedMessage("Delayed", 3000);
        console.log(result)

    } catch (error) {
        console.log(error)
    }
}
const delayedMessage = (message: string, delay: number) => {
    return new Promise((resolve) => {

        setTimeout(() => {
            resolve(message);

        }, delay);
    });
}
showMessage();

//Task 4: Fetching Advice:

const fetchAdvice = async () => {
    try {
        const response = await fetch("https://api.adviceslip.com/advice");
        const data = await response.json();
        console.log(data.slip.advice);
    } catch (error) {
        console.log("Error fetching advice:", error);

    }
};
fetchAdvice()

//Task 5: Checking the Response:

const fetchAdviceById = async (id: number) => {
    try {
        const response = await fetch(`https://api.adviceslip.com/advice/
            ${id}`);
        if (!response.ok) {
            throw new Error("Fetching did not work");
        }
        const data = await response.json();
        console.log(`Advice ID: ${id}: ${data.slip.advice}`)
    }
    catch (error) {
        console.log("Error fetching advice", error);
    }
};
fetchAdviceById(3);

// Task 6: Two Fechtes in a Row:
const fechtTwoAdvice = async () => {
    const response1 = await fetch(
        `https://api.adviceslip.com/advice/1`
    );
    const data1 = await response1.json();
    console.log(data1);

    const response2 = await fetch(
        `https://api.adviceslip.com/advice/2`
    );
    const data2 = await response2.json();
    console.log(data2);
};

fechtTwoAdvice();











