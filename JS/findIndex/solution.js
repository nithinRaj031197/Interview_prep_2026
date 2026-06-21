function findIndex(array, predicate, fromIndex = 0) {
  const length = array.length;

  const startIndex =
    fromIndex >= 0 ? fromIndex : Math.max(fromIndex + length, 0);

  for (let i = startIndex; i < length; i++) {
    if (predicate(array[i], i, array)) {
      return i;
    }
  }

  return -1;
}

export default findIndex;
