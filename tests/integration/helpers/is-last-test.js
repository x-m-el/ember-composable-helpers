import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{is-last}}', function (hooks) {
  setupRenderingTest(hooks);

  test('it returns true if a value is the last in an array', async function (assert) {
    await render(hbs`{{is-last 3 (array 1 2 3)}}`);

    assert.dom().hasText('true');
  });

  test('it returns false if a value is not the last in an array', async function (assert) {
    await render(hbs`{{is-last 1 (array 1 2 3)}}`);

    assert.dom().hasText('false');
  });
});
