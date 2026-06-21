# Find Index

## Problem

Implement a function `findIndex(array, predicate, [fromIndex=0])` that takes an array of values, a function `predicate`, and an optional `fromIndex` number argument, and returns the index of the first element in the array that satisfies the provided testing function `predicate`.

## Arguments

- `array` (Array): The array to inspect.
- `predicate` (Function): The function invoked per iteration.
- `[fromIndex=0]` (number): The index to search from.

### Predicate signature

The predicate function is invoked with three arguments: `(value, index, array)`.

- `value`: The current element being iterated.
- `index`: The index of the current element.
- `array`: The original input array.

## Returns

(number): Returns the index of the found element, or `-1` otherwise.

## Examples

```js
const arr = [1, 2, 3, 4, 5];

// Search for the first value greater than 3
findIndex(arr, (num) => num > 3);
// => 3

// Start searching from index 4 (inclusive)
findIndex(arr, (num) => num > 3, 4);
// => 4

// No such element exists
findIndex(arr, (num) => num > 10, 3);
// => -1
```

## Edge cases

Your function should handle negative and out-of-bounds indices.

- **Negative:** negative integers count back from the last item. `-1` is the last element, `-2` is second-to-last, etc.
- **Out-of-bounds:** if `fromIndex < -(array.length)`, start searching from index `0`. If `fromIndex >= array.length`, no search takes place and return `-1`.

```js
const arr = [1, 2, 3, 4, 5];

findIndex(arr, (num) => num > 2, -3);
// => 2

findIndex(arr, (num) => num % 2 === 0, -3);
// => 3

findIndex(arr, (num) => num > 2, -10);
// => 2

findIndex(arr, (num) => num > 2, 10);
// => -1
```

## Notes

- Recommended interview duration: ~10 mins
- Difficulty: Easy
