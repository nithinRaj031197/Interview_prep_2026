Function.prototype.myApply = function (thisArg, argArray) {
  if (typeof this !== "function") {
    throw new TypeError("myApply must be called by function.");
  }

  const context = thisArg ?? globalThis;

  context.fn = this;

  const result =
    argArray?.length > 0 ? context.fn(...argArray) : context.fn();

  delete context.fn;

  return result;
};
