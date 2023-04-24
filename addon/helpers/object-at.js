import { helper } from '@ember/component/helper';

export function objectAt(index, array) {
  if (!Array.isArray(array)) {
    return undefined;
  }

  index = parseInt(index, 10);

  return array.at(index);
}

export default helper(function ([index, array]) {
  return objectAt(index, array);
});
