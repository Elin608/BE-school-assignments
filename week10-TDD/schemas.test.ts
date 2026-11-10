import { test, expect } from "vitest";
import { PizzaTypeSchema, PizzaSchema, AmountSchema, OrderIdSchema } from "./pizzashop";

test("accepts margherita", () => {
    expect(PizzaTypeSchema.parse("margherita")).toBe("margherita");
});

test("rejcts Margherita with capital M", () => {
    expect(() => PizzaTypeSchema.parse("Margherita")).toThrow();
});

test("accepts valid pepperoni", () => {
    const pizza = { type: "pepperoni", price: 120 };

    expect(PizzaSchema.parse(pizza)).toEqual(pizza);
});

test("rejects pizza without price", () => {
    expect(() => PizzaSchema.parse({ type: "pepperoni" })).toThrow();
});


test("rejects amonut as string", () => {
    expect(() => AmountSchema.parse("100")).toThrow();
});

test("accepts order ID zero", () => {
    expect(OrderIdSchema.parse(0)).toBe(0);
});

