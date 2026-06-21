function findLastIndex(array, predicate, fromIndex = array.length - 1) {
  const length = array.length;

  const startIndex =
    fromIndex >= 0
      ? Math.min(fromIndex, length - 1)
      : Math.max(length + fromIndex, 0);

  for (let i = startIndex; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      return i;
    }
  }

  return -1;
}

export default findLastIndex;
