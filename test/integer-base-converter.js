/*jshint node:true, mocha:true */

'use strict';

require('should');

var other = require('integer-base-converter');
var fn = require('../src/');

describe('integer-base-converter', function() {
  it('yields the same results for base 60', function() {
    var b10To60 = fn.fromDecimal(60);

    'Ge'
      .should.be.exactly(other.convert(1000, 10, 60))
      .and.exactly(b10To60(1000));

    'Gf'
      .should.be.exactly(other.convert(1001, 10, 60))
      .and.exactly(b10To60(1001));
  });

  it('yields the same results from base 60', function() {
    var b60To10 = fn.toDecimal(60);

    '1000'
      .should.be.exactly(other.convert('Ge', 60, 10).toString())
      .and.exactly(b60To10('Ge'));

    '1001'
      .should.be.exactly(other.convert('Gf', 60, 10).toString())
      .and.exactly(b60To10('Gf'));
  });

  it.skip('yields the same results for base 62', function() {
    var b10To62 = fn.fromDecimal(62);

    'z'
      .should.be.exactly(other.convert(61, 10, 62).toString())
      .and.exactly(b10To62(61));
  });
});
