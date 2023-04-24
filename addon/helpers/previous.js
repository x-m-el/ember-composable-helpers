import { helper } from '@ember/component/helper';
import getIndex from '../utils/get-index';
import { isEmpty } from '@ember/utils';
import getValueArrayAndUseDeepEqualFromParams from '../-private/get-value-array-and-use-deep-equal-from-params';
import asArray from '../utils/as-array';

export function previous(currentValue, maybeArray, useDeepEqual = false) {
  let array = asArray(maybeArray);
  let currentIndex = getIndex(array, currentValue, useDeepEqual);

  if (isEmpty(currentIndex)) {
    return null;
  }

  return currentIndex === 0 ? currentValue : array.at(currentIndex - 1);
}

export default helper(function (params) {
  let { currentValue, array, useDeepEqual } =
    getValueArrayAndUseDeepEqualFromParams(params);

  return previous(currentValue, array, useDeepEqual);
});
