# Drop While

## Problem

Given a predicate function and an array, implement a function `dropWhile(array, predicate)`. This function should create a slice of `array` excluding elements dropped from the start of the list. Elements are dropped until `predicate` returns falsy. Your function should **not** modify the original array. The array may or may not be in sorted order.

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
dropWhile([1, 2, 3, 4, 5], (value, _index, _array) => value < 3);
// => [3, 4, 5]
// Starts from left (1). 1 < 3 (true, drop). 2 < 3 (true, drop). 3 < 3 (false, stop).

dropWhile([1, 2, 3], (value, _index, _array) => value < 6);
// => []
// 1 < 6 (true, drop). 2 < 6 (true, drop). 3 < 6 (true, drop). Reaches end.

dropWhile([1, 2, 3, 4, 5], (value, _index, _array) => value > 6);
// => [1, 2, 3, 4, 5]
// 1 > 6 (false, stop immediately).

dropWhile([1, 2, 3, 4, 5], (_value, index, _array) => index < 3);
// => [4, 5]
// Index 0: 0 < 3 (true, drop). Index 1: 1 < 3 (true, drop). Index 2: 2 < 3 (true, drop). Index 3: 3 < 3 (false, stop).

dropWhile([4, 5, 12, 10, 11], (value, _index, array) => value < array[2]);
// => [12, 10, 11]
// array[2] is 12. 4 < 12 (true, drop). 5 < 12 (true, drop). 12 < 12 (false, stop).
```

## Notes

- Recommended interview duration: ~10 mins
- Difficulty: Easy
