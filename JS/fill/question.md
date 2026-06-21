# Fill

## Problem

Implement a function `fill(array, value, [start=0], [end=array.length])` that fills an array with values from `start` up to, but not including, `end`.

**Note:** This method **mutates** `array`.

## Arguments

- `array` (Array): The array to fill.
- `value` (*): The value to fill `array` with.
- `[start=0]` (number): The start position.
- `[end=array.length]` (number): The end position.

## Returns

(Array): Returns `array`.

## Examples

```js
fill([1, 2, 3], 'a');
// => ['a', 'a', 'a']

fill([4, 6, 8, 10], '*', 1, 3);
// => [4, '*', '*', 10]

// Out-of-bounds indices
fill([4, 6, 8, 10, 12], '*', 1, 8);
// => [4, '*', '*', '*', '*']

fill([4, 6, 8, 10, 12], '*', 8, 10);
// => [4, 6, 8, 10, 12]

// Negative in-bounds indices
fill([4, 6, 8, 10, 12], '*', -3, -1);
// => [4, 6, '*', '*', 12]

// Negative out-of-bounds indices
fill([4, 6, 8, 10, 12], '*', -10, 2);
// => ['*', '*', 8, 10, 12]

fill([4, 6, 8, 10, 12], '*', -10, -8);
// => [4, 6, 8, 10, 12]
```

## Notes

- Recommended interview duration: ~10 mins
- Difficulty: Easy
