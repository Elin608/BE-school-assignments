import { test, expect } from "vitest";
import { findBook, checkOutBook, registerLoan } from "./library";


test("finds dune", () => {
    const book = findBook("dune");
    expect(book).toEqual({ title: "dune", copiesAvailable: 3 });
});

test("rejects unknown book ", () => {
    expect(() => findBook("harry potter")).toThrow();
});

test("foundation has zero copies available", () => {
    const book = findBook("foundation");
    expect(book).toEqual({ title: "foundation", copiesAvailable: 0 });
});

test("reject number as a title", () => {
    expect(() => findBook(42)).toThrow();
});

test("checkOutBook returns a number", () => {
    const book = { title: "dune", copiesAvailable: 3 };
    const loanId = checkOutBook(book);

    expect(typeof loanId).toBe("number");
});

test("loan ID is a whole number", () => {
    const book = { title: "dune", copiesAvailable: 3 };
    const loanId = checkOutBook(book);
    expect(Number.isInteger(loanId)).toBe(true);
});

test("ID number is between 1000 and 9999", () => {
    const book = { title: "dune", copiesAvailable: 3 };
    const loanId = checkOutBook(book);
    expect(loanId).toBeGreaterThanOrEqual(1000);
    expect(loanId).toBeLessThanOrEqual(9999);
});

test("throws when no copies available", () => {
    const book = { title: "foundation", copiesAvailable: 0 };
    expect(() => checkOutBook(book)).toThrow("No copies available");
});

test("throws when copiesAvailable is missing", () => {
    const book = { title: "dune" };
    expect(() => checkOutBook(book)).toThrow();
});

test("registers a valid loan", () => {
    const result = registerLoan(1234, "dune", 42);

    expect(result).toEqual({ loanId: 1234, title: "dune", memberId: 42 });
});


test("throws when memberId is 0"), () => {
    expect(() => {
        registerLoan(1234, "dune", 0);
    }).toThrow();

}

test("throws when the title isnt in the catalogue"), () => {
    expect(() => {
        registerLoan(1234, "harry potter", 7);
    }).toThrow();

}
