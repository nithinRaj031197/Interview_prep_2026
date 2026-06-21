function fill(array, value, start = 0, end = array.length) {
  const length = array.length;

  start = start < 0 ? Math.max(start + length, 0) : Math.min(start, length);
  end = end < 0 ? Math.max(end + length, 0) : Math.min(end, length);

  for (let i = start; i < end; i++) {
    array[i] = value;
  }

  return array;
}

export default fill;
