import { hbs } from 'ember-cli-htmlbars';
import { A as emberArray } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';

module('Integration | Helper | {{reduce}}', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  test('It accepts a callback', async function (assert) {
    this.set('array', emberArray([1, 2, 3]));

    this.actions.sum = (previousValue, currentValue) =>
      previousValue + currentValue;

    await render(hbs`{{reduce this.actions.sum 0 this.array}}`);

    assert.dom().hasText('6');
  });

  test('It re-evaluates when array content changes', async function (assert) {
    let array = tracked([1, 2, 3]);

    this.set('array', array);

    this.actions.sum = (previousValue, currentValue) =>
      previousValue + currentValue;

    await render(hbs`{{reduce this.actions.sum 0 this.array}}`);

    assert.dom().hasText('6');

    array.push(4);
    await settled();

    assert.dom().hasText('10');
  });

  test('It re-evaluates when initial value changes', async function (assert) {
    this.set('array', emberArray([1, 2, 3]));
    this.set('initialValue', 0);

    this.actions.sum = (previousValue, currentValue) =>
      previousValue + currentValue;

    await render(hbs`{{reduce this.actions.sum this.initialValue this.array}}`);

    assert.dom().hasText('6');

    this.set('initialValue', 4);

    assert.dom().hasText('10');
  });
});
