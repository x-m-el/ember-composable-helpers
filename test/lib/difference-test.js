/* eslint-env mocha */
'use strict';

const difference = require('../../lib/difference');
// eslint-disable-next-line n/no-unpublished-require
const expect = require('chai').expect;

describe('difference', function () {
  it('finds the difference between 2 arrays', function () {
    const a = ['foo', 'bar', 'baz'];
    const b = ['bar', 'baz', 'qux'];
    const expectedResult = ['foo'];
    const result = difference(a, b);

    expect(result).to.eql(expectedResult);
  });

  it('finds the difference between 2 arrays', function () {
    const a = ['foo', 'bar', 'baz'];
    const b = ['bar', 'baz', 'qux'];
    const expectedResult = ['qux'];
    const result = difference(b, a);

    expect(result).to.eql(expectedResult);
  });
});
