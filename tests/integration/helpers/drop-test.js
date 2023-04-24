import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';

module('Integration | Helper | {{drop}}', function (hooks) {
  setupRenderingTest(hooks);

  test('It drops the first N entries of array', async function (assert) {
    this.set('array', tracked([1, 2, 3, 4, 5]));

    await render(hbs`
      {{~#each (drop 2 this.array) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    assert.dom().hasText('345', 'first two values are dropped');
  });

  test('It watches for changes', async function (assert) {
    let array = tracked([1, 2, 3, 4, 5]);
    this.set('array', array);

    await render(hbs`
      {{~#each (drop 2 this.array) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    array.unshift(0);

    await settled();

    assert.dom().hasText('2345', '0 and 1 are dropped');
  });

  test('It allows null array', async function (assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (drop 2 this.array) as |n|}}
        {{n}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
