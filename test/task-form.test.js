const { test } = require("node:test");
const assert = require("node:assert/strict");
const { validateTaskTitle } = require("../public/index.js");

test("empty input is rejected", () => {
  const result = validateTaskTitle("");
  assert.equal(result.valid, false);
  assert.equal(result.message, "Title cannot be empty.");
});

test("short input (under 3 characters) is rejected", () => {
  const result = validateTaskTitle("ab");
  assert.equal(result.valid, false);
  assert.equal(result.message, "Title must be at least 3 characters.");
});

test("valid input is accepted", () => {
  const result = validateTaskTitle("Buy groceries");
  assert.equal(result.valid, true);
  assert.equal(result.value, "Buy groceries");
});
