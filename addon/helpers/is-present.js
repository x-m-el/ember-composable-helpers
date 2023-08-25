import { helper } from '@ember/component/helper';
import { isPresent as emberIsPresent } from '@ember/utils';

export function isPresent([checked]) {
  return emberIsPresent(checked);
}

export default helper(isPresent);
