import { hbs } from 'ember-cli-htmlbars';
import { A as emberArray } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';

module('Integration | Helper | {{map}}', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
  });

  test('It maps by value', async function (assert) {
    this.set(
      'array',
      emberArray([{ name: 'a' }, { name: 'b' }, { name: 'c' }])
    );

    this.actions.getName = function ({ name }) {
      return name;
    };

    await render(hbs`
      {{~#each (map this.actions.getName this.array) as |name|~}}
        {{~name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('abc', 'name property is mapped');
  });

  test('It watches for changes', async function (assert) {
    let array = tracked([{ name: 'a' }, { name: 'b' }, { name: 'c' }]);

    this.set('array', array);

    this.actions.getName = function ({ name }) {
      return name;
    };

    await render(hbs`
      {{~#each (map this.actions.getName this.array) as |name|~}}
        {{~name~}}
      {{~/each~}}
    `);

    assert.dom().hasText('abc', 'precondition');

    array.push({ name: 'd' });
    await settled();

    assert.dom().hasText('abcd', 'd is added');
  });

  test('it allows null array', async function (assert) {
    this.actions.getName = function ({ name }) {
      return name;
    };
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (map this.actions.getName this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });

  test('it allows undefined array', async function (assert) {
    this.actions.getName = function ({ name }) {
      return name;
    };
    this.set('array', undefined);

    await render(hbs`
      this is all that will render
      {{#each (map this.actions.getName this.array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.dom().hasText('this is all that will render', 'no error is thrown');
  });
});
