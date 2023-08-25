import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{is-present}}', function (hooks) {
  setupRenderingTest(hooks);

  test('it returns true if a value is present', async function (assert) {
    await render(hbs`{{is-present (array 1)}}`);

    assert.dom().hasText('true');
  });

  test('it returns false if a value is not present', async function (assert) {
    await render(hbs`{{is-present (array)}}`);

    assert.dom().hasText('false');
  });
});
