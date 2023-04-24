import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';

module('Integration | Helper | {{previous}}', function (hooks) {
  setupRenderingTest(hooks);

  test('It returns the previous value in an array non-primitive values', async function (assert) {
    this.set('array', tracked([{ name: 'a' }, { name: 'b' }, { name: 'c' }]));

    this.set('value', { name: 'b' });
    this.set('useDeepEqual', true);

    await render(hbs`
      {{~#let (previous this.value this.useDeepEqual this.array) as |item|~}}
        {{~item.name~}}
      {{~/let~}}
    `);

    assert.dom().hasText('a', 'a is shown');
  });

  test('It returns the previous value in an array of primitive values', async function (assert) {
    this.set('array', tracked(['lemon', 'kiwi', 'peach']));

    this.set('value', 'peach');

    await render(hbs`
      {{~#let (previous this.value this.array) as |item|~}}
        {{~item~}}
      {{~/let~}}
    `);

    assert.dom().hasText('kiwi', 'kiwi is shown');
  });

  test('It recomputes if array changes', async function (assert) {
    this.set('array', tracked([1, 2, 3]));

    await render(hbs`
      {{~#let (previous 3 this.array) as |item|~}}
        {{~item~}}
      {{~/let~}}
    `);

    assert.dom().hasText('2', '2 is shown');

    this.set('array', [2, 1, 3]);

    await settled();

    assert.dom().hasText('1', '1 is added and shown');
  });

  test('It returns the previous value in an array of related models', async function (assert) {
    const store = this.owner.lookup('service:store');

    let person = store.createRecord('person', {
      name: 'Adam',
    });

    let pets = await person.pets;

    pets.push(
      store.createRecord('pet', { name: 'Kirby' }),
      store.createRecord('pet', { name: 'Jake' })
    );

    this.set('pets', pets);
    this.set('currentPet', pets.at(-1));

    await render(hbs`
      {{~#let (previous this.currentPet this.pets) as |pet|~}}
        {{~pet.name~}}
      {{~/let~}}
    `);

    assert.dom().hasText('Kirby', 'the previous pet name is shown');
  });

  test('it allows null array', async function (assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#let (previous 1 this.array) as |value|}}
        {{value}}
      {{/let}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function (assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{#let (previous 1 this.array) as |value|}}
        {{value}}
      {{/let}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
