import { helper } from '@ember/component/helper';

export function withDefault([val, defaultVal]) {
  return val ?? defaultVal;
}

export default helper(withDefault);
