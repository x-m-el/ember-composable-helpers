import { helper } from '@ember/component/helper';
import asArray from '../utils/as-array';

export function flatten(array) {
  return asArray(array).flat(Infinity);
}

export default helper(function ([array]) {
  return flatten(array);
});
