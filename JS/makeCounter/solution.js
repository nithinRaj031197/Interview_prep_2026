function makeCounter(initialValue = 0) {
  let counter = initialValue;
  return function () {
    const valueToReturn = counter;
    counter += 1;
    return valueToReturn;
  };
}

export default makeCounter;
