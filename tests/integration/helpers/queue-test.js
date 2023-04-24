import { hbs } from 'ember-cli-htmlbars';
import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';

module('Integration | Helper | {{queue}}', function (hooks) {
  setupRenderingTest(hooks);

  test('it queues actions', async function (assert) {
    this.doAThing = () => null;
    this.process = (x) => this.set('value', x * x);
    this.undoAThing = () => null;
    this.set('value', 2);
    await render(hbs`
      <p>{{this.value}}</p>
      <button type="button" {{on 'click' (fn (queue this.doAThing this.process this.undoAThing) this.value)}}>
        Calculate
      </button>
    `);

    assert.dom('p').hasText('2', 'precond - should render 2');
    await click('button');
    assert.dom('p').hasText('4', 'should render 4');
  });

  test('it handles promises', async function (assert) {
    this.set('value', 3);
    this.doAThingThatTakesTime = resolve;
    this.process = (x) => this.set('value', x * x);
    await render(hbs`
      <p>{{this.value}}</p>
      <button type="button" {{on 'click' (fn (queue this.doAThingThatTakesTime this.process) this.value)}}>
        Calculate
      </button>
    `);

    assert.dom('p').hasText('3', 'precond - should render 3');
    await click('button');
    assert.dom('p').hasText('9', 'should render 9');
  });
});
