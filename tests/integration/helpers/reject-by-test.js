import { hbs } from 'ember-cli-htmlbars';
import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';

module('Integration | Helper | {{reject-by}}', function (hooks) {
  setupRenderingTest(hooks);

  test('It reject by value', async function (assert) {
    this.set(
      'array',
      tracked([
        { foo: false, name: 'a' },
        { foo: true, name: 'b' },
        { foo: false, name: 'c' },
      ])
    );

    await render(hbs`
      {{~#each (reject-by 'foo' true this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('ac', 'b is filtered out');
  });

  test('It rejects by truthiness', async function (assert) {
    this.set(
      'array',
      tracked([
        { foo: 'x', name: 'a' },
        { foo: undefined, name: 'b' },
        { foo: 1, name: 'c' },
        { foo: null, name: 'd' },
        { foo: [1, 2, 3], name: 'e' },
        { foo: false, name: 'f' },
        { foo: 0, name: 'g' },
        { foo: '', name: 'h' },
        { foo: NaN, name: 'i' },
        { foo: [], name: 'j' },
      ])
    );

    await render(hbs`
      {{~#each (reject-by 'foo' this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('bdfghi', 'a, c, e and j are filtered out');
  });

  test('It recomputes the filter if array changes', async function (assert) {
    let array = tracked([
      { foo: false, name: 'a' },
      { foo: true, name: 'b' },
      { foo: false, name: 'c' },
    ]);

    this.set('array', array);

    await render(hbs`
      {{~#each (reject-by 'foo' true this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    array.push({ foo: false, name: 'd' });
    await settled();

    assert.dom().hasText('acd', 'd is added');
  });

  test('It recomputes the filter if a value under given path changes', async function (assert) {
    let array = tracked([
      { foo: false, name: 'a' },
      { foo: true, name: 'b' },
      { foo: false, name: 'c' },
    ]);

    this.set('array', array);

    await render(hbs`
      {{~#each (reject-by 'foo' this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('ac', 'ac is shown');

    set(array[1], 'foo', false);

    await settled();

    assert.dom().hasText('abc', 'b is added');
  });

  test('It can be passed an action', async function (assert) {
    this.set(
      'array',
      tracked([
        { foo: 1, name: 'a' },
        { foo: 2, name: 'b' },
        { foo: 3, name: 'c' },
      ])
    );

    this.isEven = (value) => value % 2 === 0;

    await render(hbs`
      {{~#each (reject-by 'foo' this.isEven this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('ac', 'b is filtered out');
  });

  test('It respects objects that implement isEqual interface', async function (assert) {
    this.set('firstTarget', {
      isEqual(value) {
        return value === 1;
      },
    });

    this.set(
      'array',
      tracked([
        { foo: 1, name: 'a' },
        { foo: 2, name: 'b' },
        { foo: 3, name: 'c' },
      ])
    );

    await render(hbs`
      {{~#each (reject-by 'foo' this.firstTarget this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('bc', 'a is filtered out');
  });

  test('it allows null array', async function (assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (reject-by 'name' this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
