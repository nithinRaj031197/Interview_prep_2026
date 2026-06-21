# Function.prototype.apply (Polyfill)

## Problem

Implement `Function.prototype.myApply` as a polyfill for `Function.prototype.apply`.

`myApply` should invoke the function with a given `this` value and arguments provided as an array (or array-like list).

## Signature

```js
function.myApply(thisArg, argArray)
```

## Arguments

- `thisArg`: The value to use as `this` when calling the function. If `null` or `undefined`, use the global object (`globalThis`).
- `argArray` (optional): An array-like object of arguments to pass to the function. If omitted, null, or empty, call the function with no arguments.

## Returns

The result of calling the function with the specified `this` value and arguments.

## Requirements

- Throw a `TypeError` if `myApply` is not invoked on a function.
- Do not use the built-in `.call`, `.apply`, or `.bind`.

## Examples

```js
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const user = { name: "Ada" };

greet.myApply(user, ["Hello", "!"]);
// => "Hello, Ada!"

function sum(a, b) {
  return a + b;
}

sum.myApply(null, [2, 3]);
// => 5

function logArgs() {
  return Array.from(arguments).join(",");
}

log.myApply(null);
// => ""

log.myApply(null, []);
// => ""
```

## Notes

- Recommended interview duration: ~10 mins
- Difficulty: Medium
- Category: Polyfills

## Follow-ups

- How is `apply` different from `call`?
- What happens if `argArray` is not an array?
- Can you implement `myApply` using `myCall`?
