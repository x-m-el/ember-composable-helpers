import { helper } from '@ember/component/helper';
import asArray from '../utils/as-array';

export function join([separator, rawArray]) {
  let array = asArray(rawArray);

  if (Array.isArray(separator)) {
    array = separator;
    separator = ',';
  }

  return array.join(separator);
}

export default helper(join);
