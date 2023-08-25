import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{last}}', function (hooks) {
  setupRenderingTest(hooks);

  test('it the last item in an array', async function (assert) {
    await render(hbs`{{last (array 1 2 3)}}`);

    assert.dom().hasText('3');
  });

  test('can handle null', async function (assert) {
    await render(hbs`{{last null}}`);

    assert.dom().hasText('');
  });
});
