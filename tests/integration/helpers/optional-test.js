import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';

module('Integration | Helper | {{optional}}', function (hooks) {
  setupRenderingTest(hooks);

  test('If the action does not exist, it passes a no-op function', async function (assert) {
    assert.expect(0);
    await render(
      hbs`<button {{on 'click' (optional this.handler)}} type="button"></button> `
    );
    await click('button');
  });

  test('If the action does exist, it passes the given action', async function (assert) {
    assert.expect(1);
    this.set('handler', () => assert.ok(true));
    await render(
      hbs`<button {{on 'click' (optional this.handler)}} type="button"></button> `
    );
    await click('button');
  });

  test('Works in a pipe', async function (assert) {
    assert.expect(1);
    this.check = (value) => assert.strictEqual(value, 42);
    await render(hbs`
      <button {{on 'click' (fn (pipe (optional this.handler) this.check) 42)}} type="button"></button> `);
    await click('button');
  });
});
