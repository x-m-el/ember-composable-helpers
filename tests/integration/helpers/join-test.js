import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';

module('Integration | Helper | {{join}}', function (hooks) {
  setupRenderingTest(hooks);

  test('It joins the words with given separator', async function (assert) {
    this.set('array', tracked(['foo', 'bar', 'baz']));

    await render(hbs`{{join ', ' this.array}}`);

    assert
      .dom()
      .hasText('foo, bar, baz', 'words are joined with a comma and a space');
  });

  test('The default separator is a comma', async function (assert) {
    this.set('array', tracked(['foo', 'bar', 'baz']));

    await render(hbs`{{join this.array}}`);

    assert.dom().hasText('foo,bar,baz', 'words are joined with a comma');
  });

  test('It watches for changes', async function (assert) {
    let array = tracked(['foo', 'bar', 'baz']);
    this.set('array', array);

    await render(hbs`{{join ', ' this.array}}`);

    array.push('quux');

    await settled();

    assert.dom().hasText('foo, bar, baz, quux', 'quux was added');
  });

  test('it allows null array', async function (assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{join ', ' this.array}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function (assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{join ', ' this.array}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
