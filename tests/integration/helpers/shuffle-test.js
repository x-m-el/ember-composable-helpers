import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';

module('Integration | Helper | {{shuffle}}', function (hooks) {
  setupRenderingTest(hooks);

  test('It shuffles array', async function (assert) {
    this.set('array', tracked([1, 2]));
    await render(hbs`
      {{~#each (shuffle this.array) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.dom().hasText(/12|21/, 'array is shuffled');
  });

  test('It shuffles array using passed in randomizer', async function (assert) {
    this.set('array', tracked([1, 2, 3, 4]));
    this.fake = () => 0;
    await render(hbs`
      {{~#each (shuffle this.fake this.array) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.dom().hasText('2341', 'array is shuffled');
  });

  test('It handles a non-ember array', async function (assert) {
    this.set('array', [1, 2, 3, 4]);
    this.fake = () => 0;
    await render(hbs`
      {{~#each (shuffle this.fake this.array) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.dom().hasText('2341', 'array is shuffled');
  });

  test('It does not mutate the original array', async function (assert) {
    this.set('array', tracked([1, 2, 3, 4]));
    this.fake = () => 0;
    await render(hbs`
      {{~#each (shuffle this.fake this.array) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.dom().hasText('2341', 'array is shuffled');
    assert.deepEqual(
      this.array,
      [1, 2, 3, 4],
      'the original array is not shuffled'
    );
  });

  test('It gracefully handles non-array values', async function (assert) {
    this.set('notArray', 1);
    await render(hbs`
      {{~#each (shuffle this.notArray) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.dom().hasText('1', 'the non array value is rendered');
  });

  test('It recomputes the shuffle if the array changes', async function (assert) {
    this.set('array', tracked([1, 2, 3, 4]));
    this.fake = () => 0;
    await render(hbs`
      {{~#each (shuffle this.fake this.array) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.dom().hasText('2341', 'array is shuffled');

    this.set('array', tracked(['a', 2, 3, 4]));

    assert.dom().hasText('234a', 'array is shuffled');
  });

  test('It recomputes the shuffle if an item in the array changes', async function (assert) {
    let array = tracked([1, 2, 3, 4]);
    this.set('array', array);
    this.fake = () => 0;
    await render(hbs`
      {{~#each (shuffle this.fake this.array) as |value|~}}
        {{value}}
      {{~/each~}}
    `);

    assert.dom().hasText('2341', 'array is shuffled');

    array.splice(2, 1, 5);

    await settled();

    assert.dom().hasText('2541', 'array is shuffled');
  });

  test('it allows null array', async function (assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (shuffle this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function (assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{#each (shuffle this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
