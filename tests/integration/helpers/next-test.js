import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';

module('Integration | Helper | {{next}}', function (hooks) {
  setupRenderingTest(hooks);

  test('It returns the next value in an array of non-primitive values', async function (assert) {
    this.set('array', tracked([{ name: 'a' }, { name: 'b' }, { name: 'c' }]));

    this.set('value', { name: 'b' });
    this.set('useDeepEqual', true);

    await render(hbs`
      {{~#let (next this.value this.useDeepEqual this.array) as |item|~}}
        {{~item.name~}}
      {{~/let~}}
    `);

    assert.dom().hasText('c', 'c is shown');
  });

  test('It returns the next value in an array of primitive values', async function (assert) {
    this.set('array', tracked(['lemon', 'kiwi', 'peach']));

    this.set('value', 'lemon');

    await render(hbs`
      {{~#let (next this.value this.array) as |item|~}}
        {{~item~}}
      {{~/let~}}
    `);

    assert.dom().hasText('kiwi', 'kiwi is shown');
  });

  test('It recomputes if array changes', async function (assert) {
    this.set('array', tracked([1, 2, 3]));

    await render(hbs`
      {{~#let (next 1 this.array) as |item|~}}
        {{~item~}}
      {{~/let~}}
    `);

    assert.dom().hasText('2', '2 is shown');

    this.set('array', [2, 1, 3]);
    await settled();

    assert.dom().hasText('3', '3 is added and shown');
  });

  test('It returns the next value in an array of related models', async function (assert) {
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
    this.set('currentPet', pets[0]);

    await render(hbs`
      {{~#let (next this.currentPet this.pets) as |pet|~}}
        {{~pet.name~}}
      {{~/let~}}
    `);

    assert.dom().hasText('Jake', 'the next pet name is shown');
  });

  test('it allows null array', async function (assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{next 1 this.array}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function (assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{next 1 this.array}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
