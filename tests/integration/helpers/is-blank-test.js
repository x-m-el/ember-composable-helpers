import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{is-blank}}', function (hooks) {
  setupRenderingTest(hooks);

  test('it returns true if a value is blank', async function (assert) {
    await render(hbs`{{is-blank '  '}}`);

    assert.dom().hasText('true');
  });

  test('it returns false if a value is blank', async function (assert) {
    await render(hbs`{{is-blank 'hello'}}`);

    assert.dom().hasText('false');
  });
});
