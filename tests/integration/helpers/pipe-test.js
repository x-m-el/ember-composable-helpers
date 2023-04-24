import { hbs } from 'ember-cli-htmlbars';
import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';

module('Integration | Helper | {{pipe}}', function (hooks) {
  setupRenderingTest(hooks);

  test('it pipes actions', async function (assert) {
    this.set('value', 0);
    this.add = (x, y) => x + y;
    this.square = (x) => x * x;
    this.squareRoot = (x) => this.set('value', Math.sqrt(x));
    await render(hbs`
      <p>{{this.value}}</p>
      <button type="button" {{on 'click' (fn (pipe this.add this.square this.squareRoot) 2 4)}}>
        Calculate
      </button>
    `);

    assert.dom('p').hasText('0', 'precond - should render 0');
    await click('button');
    assert.dom('p').hasText('6', 'should render 6');
  });

  test('it handles promises', async function (assert) {
    this.set('value', 0);
    this.add = (x, y) => x + y;
    this.square = (x) => x * x;
    this.squareRoot = (x) => this.set('value', Math.sqrt(x));
    this.resolvify = resolve;
    await render(hbs`
      <p>{{this.value}}</p>
      <button type="button" {{on 'click' (fn (pipe this.add this.square this.resolvify this.squareRoot) 2 4)}}>
        Calculate
      </button>
    `);

    assert.dom('p').hasText('0', 'precond - should render 0');
    await click('button');
    assert.dom('p').hasText('6', 'should render 6');
  });
});
