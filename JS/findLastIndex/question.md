# Find Last Index

## Problem

Implement a function `findLastIndex(array, predicate, [fromIndex=array.length-1])` that takes an array of values, a function `predicate`, and an optional `fromIndex` number argument. `findLastIndex` iterates over elements of the array from **right to left**.

The function returns the index of the first element that satisfies the predicate when iterating backwards from `fromIndex`.

## Arguments

- `array` (Array): The array to inspect.
- `predicate` (Function): The function invoked per iteration.
- `[fromIndex=array.length-1]` (number): The index to start searching from (toward the left).

### Predicate signature

The predicate function is invoked with three arguments: `(value, index, array)`.

- `value`: The current element being iterated.
- `index`: The index of the current element.
- `array`: The original input array.

## Returns

(number): Returns the index of the found element, or `-1` otherwise.

## Examples

```js
const arr = [5, 4, 3, 2, 1]; // Indices: 0, 1, 2, 3, 4

// Search for the element > 3, starting from the end (index 4)
findLastIndex(arr, (num) => num > 3);
// => 1

// Start searching backwards from index 3
findLastIndex(arr, (num) => num > 1, 3);
// => 3

// No element satisfies the predicate when searching from index 3
findLastIndex(arr, (num) => num < 1, 3);
// => -1
```

## Edge cases

Your function should handle negative and out-of-bounds `fromIndex` values.

- **Negative fromIndex:** negative integers count back from the last item. `-1` is the last element, `-2` is second-to-last, etc.
- **Negative out-of-bounds:** if the resolved index from a negative `fromIndex` is less than `0` (e.g. `fromIndex` is `-10` for an array of length 5), the search starts from index `0`.
- **Positive out-of-bounds:** if `fromIndex >= array.length`, the search starts from the last index (`array.length - 1`).

```js
const arr = [5, 4, 3, 2, 1]; // Indices: 0, 1, 2, 3, 4

findLastIndex(arr, (num) => num > 2, -3);
// => 2

findLastIndex(arr, (num) => num % 2 === 0, -3);
// => 1

findLastIndex(arr, (num) => num > 0, 10);
// => 4

findLastIndex(arr, (num) => num > 0, -10);
// => 0
```

## Notes

- Recommended interview duration: ~10 mins
- Difficulty: Easy
