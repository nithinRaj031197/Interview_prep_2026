function dropWhile(array, predicate) {
  let index = 0;

  while (index < array.length && predicate(array[index], index, array)) {
    index++;
  }

  return array.slice(index, array.length);
}

export default dropWhile;
