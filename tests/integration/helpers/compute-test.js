import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Helper | {{compute}}', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
  });

  test("It calls an action and returns it's value", async function (assert) {
    this.actions.square = (x) => x * x;
    await render(hbs`{{compute this.actions.square 4}}`);

    assert.dom().hasText('16', '4 squared is 16');
  });
});
