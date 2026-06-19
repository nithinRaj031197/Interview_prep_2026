/**
 * Creates a counter function.
 *
 * The returned function remembers its state using closure.
 * Each time it's called:
 * - Returns the current value
 * - Then increments it for the next call
 *
 * @param {number} initialValue - Starting value (default is 0)
 * @returns {Function} counter function
 */
function makeCounter(initialValue = 0) {
  let currentValue = initialValue;

  return function counter() {
    const valueToReturn = currentValue;
    currentValue += 1;
    return valueToReturn;
  };
}

/* ---------------- Example Usage ---------------- */

const counterA = makeCounter();
console.log(counterA()); // 0
console.log(counterA()); // 1
console.log(counterA()); // 2

const counterB = makeCounter(5);
console.log(counterB()); // 5
console.log(counterB()); // 6

export default makeCounter;
