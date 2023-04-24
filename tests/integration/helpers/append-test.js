import { hbs } from 'ember-cli-htmlbars';
import { A as emberArray } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';

module('Integration | Helper | {{append}}', function (hooks) {
  setupRenderingTest(hooks);

  test('It concats two arrays', async function (assert) {
    this.set('evens', emberArray([2, 4, 6]));
    this.set('odds', emberArray([1, 3, 5]));

    await render(hbs`
      {{~#each (append this.evens this.odds) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    let expected = '246135';

    assert.dom().hasText(expected, 'appends values');
  });

  test('It concats two arrays and a value', async function (assert) {
    this.set('evens', emberArray([4, 6]));
    this.set('odds', emberArray([1, 3, 5]));
    this.set('prime', 2);

    await render(hbs`
      {{~#each (append this.evens this.odds this.prime) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    let expected = '461352';

    assert.dom().hasText(expected, 'appends values');
  });

  test('It watches for changes', async function (assert) {
    this.set('odds', tracked([1, 3, 5]));
    this.set('prime', 2);

    await render(hbs`
      {{~#each (append this.odds this.prime) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    this.odds.push(7);
    await settled();
    assert.dom().hasText('13572', 'new value is added');
  });

  test('it allows null array', async function (assert) {
    this.set('array', null);

    await render(hbs`
      {{~#each (append 1 this.array) as |value|~}}
        {{~value~}}
      {{~/each~}}
    `);

    assert.dom().hasText('1', 'no error is thrown');
  });
});
