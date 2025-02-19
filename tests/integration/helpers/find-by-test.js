import { hbs } from 'ember-cli-htmlbars';
import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';

module('Integration | Helper | {{find-by}}', function (hooks) {
  setupRenderingTest(hooks);

  test('It finds a value by a property', async function (assert) {
    this.set(
      'array',
      tracked([
        { foo: true, name: 'a' },
        { foo: false, name: 'b' },
        { foo: true, name: 'c' },
      ])
    );

    await render(hbs`
      {{~#let (find-by 'name' 'b' this.array) as |item|~}}
        {{~item.name~}}
      {{~/let~}}
    `);

    assert.dom().hasText('b', 'b is shown');
  });

  test('It finds a value by a property in arrays without prototype extensions', async function (assert) {
    this.set('array', [
      { foo: true, name: 'a' },
      { foo: false, name: 'b' },
      { foo: true, name: 'c' },
    ]);

    await render(hbs`
      {{~#let (find-by 'name' 'b' this.array) as |item|~}}
        {{~item.name~}}
      {{~/let~}}
    `);

    assert.dom().hasText('b', 'b is shown');
  });

  test('It recomputes the filter if array changes', async function (assert) {
    let array = tracked([
      { foo: true, name: 'a' },
      { foo: false, name: 'b' },
      { foo: true, name: 'c' },
    ]);

    this.set('array', array);

    await render(hbs`
      {{~#let (find-by 'name' 'd' this.array) as |item|~}}
        {{~item.name~}}
      {{~/let~}}
    `);

    assert.dom().hasText('', 'd is not found');

    array.push({ foo: true, name: 'd' });
    await settled();

    assert.dom().hasText('d', 'd is added and shown');
  });

  test('It recomputes the filter if a value under given path changes', async function (assert) {
    let array = tracked([
      { foo: true, name: 'a' },
      { foo: false, name: 'b' },
      { foo: true, name: 'c' },
    ]);

    this.set('array', array);

    await render(hbs`
      {{~#let (find-by 'name' 'd' this.array) as |item|~}}
        {{~item.name~}}
      {{~/let~}}
    `);

    assert.dom().hasText('', 'd is not found');

    set(array[1], 'name', 'd');

    await settled();

    assert.dom().hasText('d', 'd is shown');
  });

  test('It recomputes the value changes', async function (assert) {
    let array = tracked([
      { foo: true, name: 'a' },
      { foo: false, name: 'b' },
      { foo: true, name: 'c' },
    ]);

    this.set('array', array);
    this.set('value', 'd');

    await render(hbs`
      {{~#let (find-by 'name' this.value this.array) as |item|~}}
        {{~item.name~}}
      {{~/let~}}
    `);

    assert.dom().hasText('', 'd is not found');

    set(this, 'value', 'b');

    await settled();

    assert.dom().hasText('b', 'b is shown');
  });

  test('it allows null array', async function (assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#let (find-by 'name' 'd' this.array) as |value|}}
        {{value}}
      {{/let}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function (assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{#let (find-by 'name' 'd' this.array) as |value|}}
        {{value}}
      {{/let}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows freezed array', async function (assert) {
    this.set('array', Object.freeze([{ name: 'a' }, { name: 'b' }]));

    await render(hbs`
      {{#let (find-by 'name' 'a' this.array) as |value|}}
        {{value.name}}
      {{/let}}
    `);

    assert.dom().hasText('a', 'no error is thrown');
  });
});
