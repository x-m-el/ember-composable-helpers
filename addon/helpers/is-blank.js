import { helper } from '@ember/component/helper';
import { isBlank as emberIsBlank } from '@ember/utils';

export function isBlank([value]) {
  return emberIsBlank(value);
}

export default helper(isBlank);
