import { helper } from '@ember/component/helper';
import asArray from '../utils/as-array';

export function includes(needleOrNeedles, haystack) {
  if (!Array.isArray(haystack)) {
    return false;
  }

  let needles = Array.isArray(needleOrNeedles)
    ? needleOrNeedles
    : [needleOrNeedles];
  let haystackAsEmberArray = asArray(haystack);

  return asArray(needles).every((needle) => {
    return haystackAsEmberArray.includes(needle);
  });
}

export default helper(function ([needle, haystack]) {
  return includes(needle, haystack);
});
