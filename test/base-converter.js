/*jshint node:true, mocha:true */

'use strict';

require('should');

var other = require('base-converter');
var fn = require('../src/');

describe('base-converter', function() {
  it('yields the same results for base 4', function() {
    var b10To4 = fn.fromDecimal(4);

    '3'
      .should.be.exactly(other.decToGeneric(3, 4))
      .and.exactly(b10To4(3));

    '123'
      .should.be.exactly(other.decToGeneric(27, 4))
      .and.exactly(b10To4(27));

    '13231'
      .should.be.exactly(other.decToGeneric(493, 4))
      .and.exactly(b10To4(493));
  });

  it('yields the same results for base 62', function() {
    var b10To62 = fn.fromDecimalSymbols('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 62);

    'X'
      .should.be.exactly(other.decTo62(59))
      .and.exactly(b10To62(59));

    'vX'
      .should.be.exactly(other.decTo62(1981))
      .and.exactly(b10To62(1981));

    'S1Jk'
      .should.be.exactly(other.decTo62(12876366))
      .and.exactly(b10To62(12876366));
  });
});
