# Debounce

## Problem

Implement a `debounce` function that delays invoking a callback until after `wait` milliseconds have elapsed since the last time it was invoked.

## Examples

```js
const log = debounce((msg) => console.log(msg), 300);

log("a");
log("b");
log("c");
// Only "c" is logged, ~300ms after the last call
```

## Constraints

- Each call resets the timer
- The callback should receive the latest arguments
- Return a debounced function with a `.cancel()` method (optional stretch)

## Follow-ups

- How would you implement `leading` edge debounce?
- Difference between debounce and throttle?
