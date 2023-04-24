import { helper } from '@ember/component/helper';
import asArray from '../utils/as-array';

export function flatten(array) {
  if (!Array.isArray(array)) {
    return array;
  }

  return asArray(array).reduce((flattened, el) => {
    return flattened.concat(flatten(el));
  }, []);
}

export default helper(function ([array]) {
  return flatten(array);
});
