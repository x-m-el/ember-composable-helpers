import asArray from '@eflexsystems/ember-composable-helpers/utils/as-array';
import { module, test } from 'qunit';

module('Unit | Utility | as-array', function () {
  test('it works for [undefined]', function (assert) {
    let result = asArray();
    assert.strictEqual(result.length, 0);
  });

  test('it works for [null]', function (assert) {
    let result = asArray(null);
    assert.strictEqual(result.length, 0);
  });

  test('it works for [Set]', function (assert) {
    let result = asArray(new Set([1, 2, 3]));
    assert.strictEqual(result.length, 3);
  });

  test('it works for [Map]', function (assert) {
    let map = new Map();
    map.set(1, 1);
    map.set(2, 1);
    map.set(3, 1);
    let result = asArray(map);
    assert.strictEqual(result.length, 3);
  });

  test('it works for [Object]', function (assert) {
    let result = asArray({ a: 1, b: 2, c: 3 });
    assert.strictEqual(result.length, 3);
  });

  test('it works for [Strings]', function (assert) {
    let result = asArray('abc');
    assert.strictEqual(result.length, 3);
  });

  test('it not works for number', function (assert) {
    assert.expect(1);
    try {
      asArray(1);
    } catch (e) {
      assert.ok(e.toString().includes('not supported'));
    }
  });

  test('it not works for non-iterable items', function (assert) {
    assert.expect(1);
    try {
      asArray(Symbol('a'));
    } catch (e) {
      assert.ok(e.toString().includes('not iterable'));
    }
  });

  test('it not works for proxy-like object as array', function (assert) {
    assert.expect(1);
    try {
      const item = new Promise((r) => r());
      asArray(item);
    } catch (e) {
      assert.ok(
        e.toString().includes('Promise-like objects is not supported as arrays')
      );
    }
  });

  test('it not works for WeakMap as array', function (assert) {
    assert.expect(1);
    try {
      const item = new WeakMap();
      asArray(item);
    } catch (e) {
      assert.ok(e.toString().includes('WeakMaps is not supported as arrays'));
    }
  });

  test('it not works for WeakSet as array', function (assert) {
    assert.expect(1);
    try {
      const item = new WeakSet();
      asArray(item);
    } catch (e) {
      assert.ok(e.toString().includes('WeakSets is not supported as arrays'));
    }
  });
});
