import { resolve } from 'rsvp';
import { invoke } from 'dummy/helpers/invoke';
import { module, test } from 'qunit';
import { tracked } from 'tracked-built-ins';

module('Unit | Helper | invoke', function () {
  test('it calls method inside objects', function (assert) {
    let object = {
      callMom() {
        return `calling mom in ${[...arguments]}`;
      },
    };
    let action = invoke(['callMom', 1, 2, 3, object]);

    assert.strictEqual(action(), 'calling mom in 1,2,3', 'it calls functions');
  });

  test('it is promise aware', function (assert) {
    assert.expect(1);
    let done = assert.async();
    let object = {
      func() {
        return resolve([1, 2, 3]);
      },
    };

    let action = invoke(['func', object]);
    let result = action();

    result.then((resolved) => {
      assert.deepEqual([1, 2, 3], resolved, 'it is promise aware');
      done();
    });
  });

  test('it wraps array of promises in another promise', async function (assert) {
    assert.expect(1);
    let array = tracked([]);

    array.push({
      func() {
        return resolve(1);
      },
    });
    array.push({
      func() {
        return resolve(2);
      },
    });
    array.push({
      func() {
        return resolve(3);
      },
    });

    let action = invoke(['func', array]);
    let result = action();

    const resolved = await result;
    assert.deepEqual([1, 2, 3], resolved, 'it is promise aware');
  });
});
