import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';

module('Integration | Helper | {{has-previous}}', function (hooks) {
  setupRenderingTest(hooks);

  test('it checks if an array has a previous value', async function (assert) {
    let array = [{ name: 'Ross' }, { name: 'Rachel' }, { name: 'Joey' }];
    this.set('array', array);
    this.set('value', { name: 'Rachel' });
    this.set('useDeepEqual', true);

    await render(hbs`{{has-previous this.value this.useDeepEqual this.array}}`);

    assert.dom().hasText('true', 'should render true');
  });

  test('It recomputes if array changes', async function (assert) {
    this.set('array', tracked([1, 2, 3]));
    this.set('value', 1);

    await render(hbs`{{has-previous this.value this.array}}`);

    assert.dom().hasText('false', 'true is shown');

    this.set('array', [3, 2, 1]);

    await settled();

    assert.dom().hasText('true', 'false is shown');
  });

  test('it allows null array', async function (assert) {
    this.set('array', null);

    await render(hbs`{{has-previous 1 this.array}}`);

    assert.dom().hasText('false', 'no error is thrown');
  });

  test('it allows undefined array', async function (assert) {
    this.set('array', undefined);

    await render(hbs`{{has-previous 1 this.array}}`);

    assert.dom().hasText('false', 'no error is thrown');
  });
});
