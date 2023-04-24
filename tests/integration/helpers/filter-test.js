import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';

module('Integration | Helper | {{filter}}', function (hooks) {
  setupRenderingTest(hooks);

  test('It filters by truthiness', async function (assert) {
    this.set(
      'array',
      tracked([
        { foo: 'x', name: 'a' },
        { foo: undefined, name: 'b' },
        { foo: 1, name: 'c' },
        { foo: null, name: 'd' },
        { foo: [1, 2, 3], name: 'e' },
      ])
    );

    this.truthyFoo = function ({ foo }) {
      return !!foo;
    };

    await render(hbs`
      {{~#each (filter this.truthyFoo this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('ace', 'b and d are filtered out');
  });

  test('It recomputes the filter if array changes', async function (assert) {
    let array = tracked([
      { foo: true, name: 'a' },
      { foo: false, name: 'b' },
      { foo: true, name: 'c' },
    ]);

    this.set('array', array);

    this.getFoo = function ({ foo }) {
      return foo;
    };

    await render(hbs`
      {{~#each (filter this.getFoo this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    array.push({ foo: true, name: 'd' });
    await settled();

    assert.dom().hasText('acd', 'd is added');
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

    this.isOdd = ({ foo }) => foo % 2 !== 0;

    await render(hbs`
      {{~#each (filter this.isOdd this.array) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('ac', 'b is filtered out');
  });

  test('it allows null array', async function (assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (filter 'name' this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function (assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{#each (filter 'name' this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it accepts a fulfilled ember data promise as a value', async function (assert) {
    let store = this.owner.lookup('service:store');
    let person = store.createRecord('person');

    let pets = await person.pets;

    pets.push(
      store.createRecord('pet', { name: 'aa' }),
      store.createRecord('pet', { name: 'ab' }),
      store.createRecord('pet', { name: 'bc' })
    );

    this.set('pets', pets);

    this.startsWithA = function ({ name }) {
      return name.startsWith('a');
    };

    await render(hbs`
      {{~#each (filter this.startsWithA this.pets) as |item|~}}
        {{~item.name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('aaab', 'bc is filtered out');
  });
});
