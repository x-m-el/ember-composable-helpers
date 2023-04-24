import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';

module('Integration | Helper | {{reduce}}', function (hooks) {
  setupRenderingTest(hooks);

  test('It accepts a callback', async function (assert) {
    this.set('array', tracked([1, 2, 3]));

    this.sum = (previousValue, currentValue) => previousValue + currentValue;

    await render(hbs`{{reduce this.sum 0 this.array}}`);

    assert.dom().hasText('6');
  });

  test('It re-evaluates when array content changes', async function (assert) {
    let array = tracked([1, 2, 3]);

    this.set('array', array);

    this.sum = (previousValue, currentValue) => previousValue + currentValue;

    await render(hbs`{{reduce this.sum 0 this.array}}`);

    assert.dom().hasText('6');

    array.push(4);
    await settled();

    assert.dom().hasText('10');
  });

  test('It re-evaluates when initial value changes', async function (assert) {
    this.set('array', tracked([1, 2, 3]));
    this.set('initialValue', 0);

    this.sum = (previousValue, currentValue) => previousValue + currentValue;

    await render(hbs`{{reduce this.sum this.initialValue this.array}}`);

    assert.dom().hasText('6');

    this.set('initialValue', 4);

    assert.dom().hasText('10');
  });
});
