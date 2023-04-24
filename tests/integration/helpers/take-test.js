import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';

module('Integration | Helper | {{take}}', function (hooks) {
  setupRenderingTest(hooks);

  test('It takes the first N entries of array', async function (assert) {
    this.set('array', tracked([1, 2, 3, 4, 5]));

    await render(hbs`
      {{~#each (take 2 this.array) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    assert.dom().hasText('12', 'first two values are kept');
  });

  test('It watches for changes', async function (assert) {
    let array = tracked([1, 2, 3, 4, 5]);
    this.set('array', array);

    await render(hbs`
      {{~#each (take 2 this.array) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    array.unshift(0);

    await settled();

    assert.dom().hasText('01', '0 and 1 are kept');
  });

  test('It allows null arrays', async function (assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{~#each (take 2 this.array) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    assert.dom().hasText('this is all that will render');
  });

  test('It allows undefined arrays', async function (assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{~#each (take 2 this.array) as |n|~}}
        {{n}}
      {{~/each~}}
    `);

    assert.dom().hasText('this is all that will render');
  });
});
