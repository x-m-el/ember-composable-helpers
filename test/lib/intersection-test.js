/* eslint-env mocha */
'use strict';

const intersection = require('../../lib/intersection');
// eslint-disable-next-line n/no-unpublished-require
const expect = require('chai').expect;

describe('intersection', function () {
  it('finds the intersection between 2 arrays', function () {
    const a = ['foo', 'bar', 'baz'];
    const b = ['bar', 'baz', 'qux'];
    const expectedResult = ['bar', 'baz'];
    const result = intersection(a, b);

    expect(result).to.eql(expectedResult);
  });

  it('finds the intersection between 2 arrays', function () {
    const a = ['foo', 'bar', 'baz'];
    const b = ['bar', 'baz', 'qux'];
    const expectedResult = ['bar', 'baz'];
    const result = intersection(b, a);

    expect(result).to.eql(expectedResult);
  });
});
