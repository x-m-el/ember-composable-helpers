/**
 * Finds the intersection between 2 arrays.
 *
 * let a = [1, 2, 3];
 * let b = [3, 4, 5];
 * intersection(a, b) === [3];
 * intersection(b, a) === [3];
 *
 * @public
 * @param  {Array} a
 * @param  {Array} b
 * @return {Array}
 */
module.exports = function intersection(a, b) {
  return a.filter((value) => b.includes(value));
};
