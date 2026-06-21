Function.prototype.myCall = function (thisArg, ...argArray) {
  if (typeof this !== "function") {
    throw new TypeError("myCall must be called on a function");
  }

  const context = thisArg ?? globalThis;

  context.fn = this;

  const result = context.fn(...argArray);

  delete context.fn;

  return result;
};
