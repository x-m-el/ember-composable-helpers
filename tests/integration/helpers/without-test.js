import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';

module('Integration | Helper | {{without}}', function (hooks) {
  setupRenderingTest(hooks);

  test('it returns a new array with given value ommitted', async function (assert) {
    this.set('items', ['foo', 'bar', 'baz']);

    await render(hbs`
      {{~#each (without "foo" this.items) as |remaining|~}}
        {{remaining}}
      {{~/each~}}
    `);

    assert.dom().hasText('barbaz', 'should render remaining values');
  });

  test('it returns a new array with given values ommitted', async function (assert) {
    this.set('items', ['foo', 'bar', 'baz']);
    this.set('selectedItems', ['foo', 'bar']);

    await render(hbs`
      {{~#each (without this.selectedItems this.items) as |remaining|~}}
        {{remaining}}
      {{~/each~}}
    `);

    assert.dom().hasText('baz', 'should render remaining values');
  });

  test('it returns the same array when no values are ommitted', async function (assert) {
    this.set('items', ['foo', 'bar', 'baz']);

    await render(hbs`
      {{~#each (without "missing" this.items) as |remaining|~}}
        {{remaining}}
      {{~/each~}}
    `);

    assert.dom().hasText('foobarbaz', 'should render remaining values');
  });

  test('it responds to changes', async function (assert) {
    this.set('items', tracked(['foo', 'bar', 'baz']));

    await render(hbs`
      {{~#each (without "quux" this.items) as |remaining|~}}
        {{remaining}}
      {{~/each~}}
    `);

    assert.dom().hasText('foobarbaz', 'should render all values');

    this.items.push('quux');
    await settled();
    assert.dom().hasText('foobarbaz', 'should not render quux');
  });

  test('it accepts an ember data array', async function (assert) {
    let store = this.owner.lookup('service:store');

    let person = store.createRecord('person', {
      name: 'Adam',
    });

    let pets = await person.pets;

    pets.push(
      store.createRecord('pet', { name: 'Kirby' }),
      store.createRecord('pet', { name: 'Jake' })
    );

    store.createRecord('pet', { name: 'Eva' });

    this.set('person', person);
    this.set('pets', pets);
    this.set('allPets', store.peekAll('pet'));

    await render(hbs`
      {{~#each (without this.pets this.allPets) as |pet|~}}
        {{~pet.name~}}
      {{~/each~}}
    `);

    assert.dom(this.element).hasText('Eva', 'the remaining pet name is shown');
  });

  test('it allows null array', async function (assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (without 1 this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function (assert) {
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{#each (without 1 this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
