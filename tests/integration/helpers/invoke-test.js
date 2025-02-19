import { hbs } from 'ember-cli-htmlbars';
import { resolve } from 'rsvp';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';

module('Integration | Helper | {{invoke}}', function (hooks) {
  setupRenderingTest(hooks);

  test('it invokes methods and handles promises', async function (assert) {
    this.set('value', 2);
    this.set('serverSideComputation', function (x) {
      return resolve(x * x);
    });
    this.setValue = (x) => this.set('value', x);

    await render(hbs`
      <p>{{this.value}}</p>
      <button type="button" {{on 'click' (pipe (invoke "serverSideComputation" 2 this) this.setValue)}}>
        Calculate
      </button>
    `);

    assert.dom('p').hasText('2', 'precond - should render 2');
    await click('button');
    assert.dom('p').hasText('4', 'should render 4');
  });

  test('it invokes methods and handles promise arrays', async function (assert) {
    class Square {
      constructor(side) {
        this.side = side;
      }
      calcArea() {
        return resolve(this.side * this.side);
      }
    }

    this.set('model', [new Square(1), new Square(2), new Square(3)]);
    this.sumAreas = (x) => {
      this.set(
        'value',
        x.reduce((a, b) => a + b)
      );
    };

    await render(hbs`
      <p>{{this.value}}</p>
      <button type="button" {{on 'click' (pipe (invoke "calcArea" this.model) this.sumAreas)}}>
        Calculate
      </button>
    `);

    await click('button');
    assert.dom('p').hasText('14', 'should render 14');
  });
});
