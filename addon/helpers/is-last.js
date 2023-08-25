import { helper } from '@ember/component/helper';

export function isLast([checked, array]) {
  if (array == null || checked == null) {
    return false;
  }

  return array.at(-1) === checked;
}

export default helper(isLast);
