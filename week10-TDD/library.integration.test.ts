import { test, expect } from "vitest";
import { borrowBook } from "./library";

test("borrows dune", () => {
    const loan = borrowBook("dune", 7);

    expect(loan.title).toBe("dune");
    expect(loan.memberId).toBe(7);
});

test(" loanId is between 1000 and 9999", () => {
    const loan = borrowBook("dune", 7);

    expect(loan.loanId).toBeGreaterThanOrEqual(1000);
    expect(loan.loanId).toBeLessThanOrEqual(9999);
});

test("throws when no copies are available", () => {
    expect(() => {
        borrowBook("foundation", 7)
    }).toThrow("No copies available");
});

test("throws when membersId is negative", () => {
    expect(() => {
        borrowBook("dune", -1)
    }).toThrow();
});