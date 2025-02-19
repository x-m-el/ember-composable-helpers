function isIterable(value) {
  return Symbol.iterator in Object(value);
}

function isPromiseLike(thing) {
  return typeof thing.then === 'function';
}

function toExtendable(array) {
  if (!Object.isExtensible(array)) {
    return Array.from(array);
  } else {
    return array;
  }
}

export default function asArray(maybeArray) {
  return toExtendable(_asArray(maybeArray));
}

function _asArray(maybeArray) {
  if (typeof maybeArray === 'number') {
    throw new Error(
      'Numbers not supported as arrays [ember-composable-helpers]'
    );
  }
  if (typeof maybeArray === 'string') {
    return maybeArray.split('');
  }
  // for perf-reasons falling back to e-array, instead of using it first
  if (Array.isArray(maybeArray)) {
    return maybeArray;
  } else if (typeof maybeArray === 'object' && maybeArray === null) {
    return [];
  } else if (typeof maybeArray === 'undefined') {
    return [];
  } else if (maybeArray instanceof Set) {
    return Array.from(maybeArray.values());
  } else if (maybeArray instanceof Map) {
    return Array.from(maybeArray.values());
  } else if (maybeArray instanceof WeakMap) {
    throw new Error(
      'WeakMaps is not supported as arrays [ember-composable-helpers]'
    );
  } else if (maybeArray instanceof WeakSet) {
    throw new Error(
      'WeakSets is not supported as arrays [ember-composable-helpers]'
    );
  }
  if (typeof maybeArray === 'object') {
    if (isPromiseLike(maybeArray)) {
      throw new Error(
        'Promise-like objects is not supported as arrays [ember-composable-helpers]'
      );
    }
    return Array.from(Object.values(maybeArray));
  }
  if (!maybeArray) {
    return [];
  }
  if (!isIterable(maybeArray)) {
    throw new Error(
      'Argument, passed as array is not iterable [ember-composable-helpers]'
    );
  }
  return maybeArray;
}
