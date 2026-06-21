# Drop Right While

## Problem

Given a predicate function and an array, implement a function `dropRightWhile(array, predicate)`. This function should create a slice of `array` excluding elements dropped from the end. Elements are dropped until `predicate` returns falsy. Your function should **not** modify the original array. The array may or may not be in sorted order.

## Arguments

- `array` (Array): The array to query.
- `predicate` (Function): The function invoked per iteration.

### Predicate signature

The predicate function is invoked with three arguments: `(value, index, array)`. You must invoke it with all three arguments.

- `value`: The current element being iterated.
- `index`: The index of the current element.
- `array`: The original input array.

## Returns

(Array): Returns the slice of `array` containing the kept elements.

## Examples

```js
// Example 1: Basic usage
dropRightWhile([1, 2, 3, 4, 5], (value, _index, _array) => value > 3);
// => [1, 2, 3]
// Starts from right (5). 5 > 3 (true, drop). 4 > 3 (true, drop). 3 > 3 (false, stop).

// Example 2: Predicate always true
dropRightWhile([1, 2, 3], (value, _index, _array) => value < 6);
// => []
// 3 < 6 (true, drop). 2 < 6 (true, drop). 1 < 6 (true, drop).

// Example 3: Predicate always false
dropRightWhile([1, 2, 3, 4, 5], (value, _index, _array) => value > 6);
// => [1, 2, 3, 4, 5]
// 5 > 6 (false, stop immediately).

// Example 4: Using the index argument
dropRightWhile([1, 2, 3, 4, 5], (_value, index, _array) => index > 2);
// => [1, 2, 3]
// Index 4: 4 > 2 (true, drop). Index 3: 3 > 2 (true, drop). Index 2: 2 > 2 (false, stop).

// Example 5: Using the array argument
dropRightWhile([10, 11, 12, 4, 5], (value, _index, array) => value < array[1]);
// => [10, 11, 12]
// array[1] = 11. 5 < 11 (true, drop). 4 < 11 (true, drop). 12 < 11 (false, stop).
```

## Notes

- Recommended interview duration: ~10 mins
- Difficulty: Easy
