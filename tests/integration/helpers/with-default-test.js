import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{with-default}}', function (hooks) {
  setupRenderingTest(hooks);

  test('it returns the value if it is not null', async function (assert) {
    await render(hbs`{{with-default 2 1}}`);

    assert.dom().hasText('2');
  });

  test('it returns the default value if value is null', async function (assert) {
    await render(hbs`{{with-default null 1}}`);

    assert.dom().hasText('1');
  });
});
