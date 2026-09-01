
type IDType = number | string;
const showID = (ID:IDType) => {
    console.log("Your ID is:" + ID)
};
showID("1122");
showID(6677);


type FruitType = string;
const eatFruit=(Fruit:FruitType)=>{
    console.log("You ate an "+ Fruit)

};
eatFruit("apple");
eatFruit("orange");



