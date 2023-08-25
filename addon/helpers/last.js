import { helper } from '@ember/component/helper';

export function last([arr]) {
  return arr?.at(-1);
}

export default helper(last);
