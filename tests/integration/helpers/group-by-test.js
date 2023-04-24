import { hbs } from 'ember-cli-htmlbars';
import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { tracked } from 'tracked-built-ins';

module('Integration | Helper | {{group-by}}', function (hooks) {
  setupRenderingTest(hooks);

  test('It groups by given property', async function (assert) {
    this.set(
      'array',
      tracked([
        { category: 'a', name: 'a' },
        { category: 'b', name: 'c' },
        { category: 'a', name: 'b' },
        { category: 'b', name: 'd' },
      ])
    );

    await render(hbs`
      {{~#each-in (group-by 'category' this.array) as |category entries|~}}
        {{~category~}}
        {{~#each entries as |entry|~}}{{~entry.name~}}{{~/each~}}
      {{~/each-in~}}
    `);

    assert.dom().hasText('aabbcd', 'aabbcd is the right order');
  });

  test('It watches for changes', async function (assert) {
    let array = tracked([
      { category: 'a', name: 'a' },
      { category: 'b', name: 'c' },
      { category: 'a', name: 'b' },
      { category: 'b', name: 'd' },
    ]);

    this.set('array', array);

    await render(hbs`
      {{~#each-in (group-by 'category' this.array) as |category entries|~}}
        {{~category~}}
        {{~#each entries as |entry|~}}{{~entry.name~}}{{~/each~}}
      {{~/each-in~}}
    `);

    run(() => set(array[3], 'category', 'c'));

    assert.dom().hasText('aabbccd', 'aabbccd is the right order');
  });
});
