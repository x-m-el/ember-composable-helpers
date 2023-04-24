import { get } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { helper } from '@ember/component/helper';
import asArray from '../utils/as-array';

const collator = new Intl.Collator(undefined, {
  sensitivity: 'base',
});

function safeValueForKey(ctx, key) {
  if (ctx === null || ctx === undefined) {
    return ctx;
  }
  return get(ctx, key);
}

function sortDesc(key, a, b) {
  if (isEmpty(key)) {
    return 0;
  }

  const aValue = safeValueForKey(a, key);
  const bValue = safeValueForKey(b, key);

  const isANullable = typeof aValue == 'undefined' || aValue === null;
  const isBNullable = typeof bValue == 'undefined' || bValue === null;

  if (isANullable && isBNullable) {
    //both values are nullable
    return 0;
  }

  if (isBNullable) {
    // keep bValue last
    return -1;
  }
  if (isANullable) {
    // put aValue last
    return 1;
  }

  if (aValue.toLowerCase && bValue.toLowerCase) {
    return collator.compare(bValue, aValue);
  }

  if (aValue < bValue) {
    return 1;
  } else if (aValue > bValue) {
    return -1;
  }

  return 0;
}

function sortAsc(key, a, b) {
  if (isEmpty(key)) {
    return 0;
  }

  const aValue = safeValueForKey(a, key);
  const bValue = safeValueForKey(b, key);

  const isANullable = typeof aValue == 'undefined' || aValue === null;
  const isBNullable = typeof bValue == 'undefined' || bValue === null;

  if (isANullable && isBNullable) {
    //both values are nullable
    return 0;
  }

  if (isBNullable) {
    // keep bValue last
    return -1;
  }
  if (isANullable) {
    // put aValue last
    return 1;
  }

  if (aValue.toLowerCase && bValue.toLowerCase) {
    return collator.compare(aValue, bValue);
  }

  if (aValue < bValue) {
    return -1;
  } else if (aValue > bValue) {
    return 1;
  }

  return 0;
}

const getComparator = (key) => {
  if (typeof key === 'function') {
    return key;
  }

  let func = sortAsc;
  if (key.match(':desc')) {
    func = sortDesc;
  }

  return (a, b) => func(key.replace(/:desc|:asc/, ''), a, b);
};

const performSort = (array, keys = []) => {
  let compFuncs = keys.map((key) => getComparator(key));
  let compFunc = (a, b) => {
    for (let i = 0; i < compFuncs.length; i += 1) {
      let result = compFuncs[i](a, b);
      if (result === 0) {
        continue;
      }
      return result;
    }
    return 0;
  };

  return [...array].sort(compFunc);
};

export function sortBy(params) {
  // slice params to avoid mutating the provided params
  let sortParams = params.slice();
  let array = asArray(sortParams.pop());
  let sortKeys = sortParams;

  if (!array || !sortKeys || sortKeys.length === 0) {
    return [];
  }

  if (sortKeys.length === 1 && Array.isArray(sortKeys[0])) {
    sortKeys = sortKeys[0];
  }

  return performSort(array, sortKeys);
}

export default helper(sortBy);
