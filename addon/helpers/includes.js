import { helper } from '@ember/component/helper';
import asArray from '../utils/as-array';

export function includes(needleOrNeedles, haystack) {
  if (!Array.isArray(haystack)) {
    return false;
  }

  const haystackAsEmberArray = asArray(haystack);

  if (!Array.isArray(needleOrNeedles)) {
    return haystackAsEmberArray.includes(needleOrNeedles);
  }

  return asArray(needleOrNeedles).every((needle) => {
    return haystackAsEmberArray.includes(needle);
  });
}

export default helper(function ([needle, haystack]) {
  return includes(needle, haystack);
});
