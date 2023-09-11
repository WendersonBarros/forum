const calculator = require("../models/calculator.js")

test("Sum 2 + 2 should return 4", () => {
  const result = calculator.sum(2, 2);
  expect(result).toBe(4);
});

test("Sum 5 + 100 should return 105", () => {
  const result = calculator.sum(5, 100);
  expect(result).toBe(105);
});

test("String 'banana' + 100 should return Error", () => {
  const result = calculator.sum("banana", 100);
  expect(result).toBe("Error");
});
