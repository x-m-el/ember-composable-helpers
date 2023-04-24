import { helper } from '@ember/component/helper';

export function reverse([array]) {
  if (!Array.isArray(array)) {
    return [array];
  }

  return array.slice(0).reverse();
}

export default helper(reverse);
