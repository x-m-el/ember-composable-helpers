import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';
import asArray from '../utils/as-array';
import { get } from '@ember/object';

export function findBy([byPath, value, array]) {
  if (isEmpty(byPath)) {
    return [];
  }

  return asArray(array).find((val) => get(val, byPath) === value);
}

export default helper(findBy);
