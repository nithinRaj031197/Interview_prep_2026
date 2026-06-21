# Function.prototype.call (Polyfill)

## Problem

Implement `Function.prototype.myCall` as a polyfill for `Function.prototype.call`.

`myCall` should invoke the function with a given `this` value and arguments passed individually.

## Signature

```js
function.myCall(thisArg, ...argArray)
```

## Arguments

- `thisArg`: The value to use as `this` when calling the function. If `null` or `undefined`, use the global object (`globalThis`).
- `...argArray`: Arguments to pass to the function.

## Returns

The result of calling the function with the specified `this` value and arguments.

## Requirements

- Throw a `TypeError` if `myCall` is not invoked on a function.
- Do not use the built-in `.call`, `.apply`, or `.bind`.

## Examples

```js
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const user = { name: "Ada" };

greet.myCall(user, "Hello", "!");
// => "Hello, Ada!"

function sum(a, b) {
  return a + b;
}

sum.myCall(null, 2, 3);
// => 5 (thisArg null/undefined → globalThis in non-strict; in modules, still works for pure functions)
```

## Notes

- Recommended interview duration: ~10 mins
- Difficulty: Medium
- Category: Polyfills

## Follow-ups

- How does this differ from `apply`?
- What edge cases exist when `thisArg` is a primitive?
- How would you implement `myApply` and `myBind`?
