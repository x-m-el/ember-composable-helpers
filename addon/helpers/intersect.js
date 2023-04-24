import { helper } from '@ember/component/helper';
import asArray from '../utils/as-array';

export function intersect([...arrays]) {
  const confirmedArrays = asArray(arrays).map((array) => {
    return Array.isArray(array) ? array : [];
  });

  return confirmedArrays.pop().filter((candidate) => {
    for (const array of confirmedArrays) {
      if (array.includes(candidate)) {
        return true;
      }
    }

    return false;
  });
}

export default helper(intersect);
