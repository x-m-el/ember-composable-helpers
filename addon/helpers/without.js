import { helper } from '@ember/component/helper';

function contains(needle, haystack) {
  return haystack.includes(needle);
}

export function without(needle, haystack) {
  if (!Array.isArray(haystack)) {
    return false;
  }

  if (Array.isArray(needle)) {
    return haystack.reduce((acc, val) => {
      return contains(val, needle) ? acc : acc.concat(val);
    }, []);
  }

  return haystack.reduce((acc, val) => {
    return val === needle ? acc : acc.concat(val);
  }, []);
}

export default helper(function ([needle, haystack]) {
  return without(needle, haystack);
});
