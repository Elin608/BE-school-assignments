enum Color {
    Red = "Red",
    Green = "Green",
    Blue = "Blue",
};
const showColor = (color: Color): string => {
    return "You choose " + color;
}
console.log(showColor(Color.Red));
console.log(showColor(Color.Green));
console.log(showColor(Color.Blue));



enum PizzaSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
};
const orderPizza = (pizzaSize: PizzaSize): string => {
    return "You ordered a " + pizzaSize + " pizza";
};
console.log(orderPizza(PizzaSize.Small));
console.log(orderPizza(PizzaSize.Medium));
console.log(orderPizza(PizzaSize.Large));
