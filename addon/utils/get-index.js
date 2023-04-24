import isEqual from '../utils/is-equal';

export default function getIndex(array, currentValue, useDeepEqual) {
  let needle = currentValue;

  if (useDeepEqual) {
    return array.findIndex((object) => {
      return isEqual(object, currentValue, useDeepEqual);
    });
  }

  let index = array.indexOf(needle);

  return index >= 0 ? index : null;
}
