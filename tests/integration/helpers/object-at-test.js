import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';

module('Integration | Helper | {{object-at}}', function (hooks) {
  setupRenderingTest(hooks);

  test('It gets an object by index', async function (assert) {
    this.set('array', ['apples', 'oranges', 'bananas']);
    this.set('index', 1);

    await render(hbs`{{object-at this.index this.array}}`);

    assert.dom().hasText('oranges', 'the correct object is displayed');
  });

  test('It returns undefined with the index is outside the bounds of the array', async function (assert) {
    this.set('array', ['apples', 'oranges', 'bananas']);
    this.set('index', 5);

    await render(hbs`{{if (object-at this.index this.array) 'true' 'false'}}`);

    assert.dom().hasText('false', 'the returned value is falsey');
  });

  test('It returns an updated value when the object at the given index changes', async function (assert) {
    this.set('array', tracked(['apples', 'oranges', 'bananas']));
    this.set('index', 1);

    await render(hbs`{{object-at this.index this.array}}`);

    assert.dom().hasText('oranges', 'the original object is display');

    this.array.splice(1, 1);

    await settled();

    assert.dom().hasText('bananas', 'the new object is displayed');
  });

  test('It returns undefined if using an non-array-like object', async function (assert) {
    this.set('array', 'foo');
    this.set('index', 1);

    await render(hbs`{{object-at this.index this.array}}`);

    assert.dom().hasText('', 'nothing is displayed');
  });

  test('it allows null array', async function (assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{object-at 1 this.array}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function (assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{object-at 1 this.array}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
