/*jshint node:true, mocha:true */

'use strict';

require('should');

var Decimal = require('arbitrary-precision')(require('bigjs-adapter'));
var toDecimalFactory = require('to-decimal-arbitrary-precision');
var d = toDecimalFactory(Decimal);

Decimal.Impl.E_POS = 40;

var symbols = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~';

var other = require('bigint-base-converter');
var fn = require('../src/');

describe('bigint-base-converter', function() {
  it('yields the same results from base 16', function() {
    var b16To10 = fn.decimal(d, 16, 10);

    '21932261930451111902915077091070067066'
      .should.be.exactly(other('108000000000000000080800200C417A', '0123456789ABCDEF', '0123456789'))
      .and.exactly(b16To10('108000000000000000080800200C417A'));
  });

  it('yields the same results for base 16', function() {
    var b16To10 = fn.decimal(d, 10, 16);

    '108000000000000000080800200C417A'
      .should.be.exactly(other('21932261930451111902915077091070067066', '0123456789', '0123456789ABCDEF'))
      .and.exactly(b16To10('21932261930451111902915077091070067066'));
  });

  it('yields the same results from 16 to 85', function() {
    var b16To85 = fn.raw(d, symbols, 16, 85);

    '4)+k&C#VzJ4br>0wv%Yp'
      .should.be.exactly(other('108000000000000000080800200C417A', '0123456789ABCDEF', symbols))
      .and.exactly(b16To85('108000000000000000080800200C417A'));
  });

  it('yields the same results from 10 to 85', function() {
    var b16To85 = fn.raw(d, symbols, 10, 85);

    '4)+k&C#VzJ4br>0wv%Yp'
      .should.be.exactly(other('21932261930451111902915077091070067066', '0123456789', symbols))
      .and.exactly(b16To85('21932261930451111902915077091070067066'));
  });

  it('yields the same results from 85 to 16', function() {
    var b85To16 = fn.raw(d, symbols, 85, 16);

    '108000000000000000080800200C417A'
      .should.be.exactly(other('4)+k&C#VzJ4br>0wv%Yp', symbols, '0123456789ABCDEF'))
      .and.exactly(b85To16('4)+k&C#VzJ4br>0wv%Yp'));
  });

  it('yields the same results from 85 to 10', function() {
    var b85To10 = fn.raw(d, symbols, 85, 10);

    '21932261930451111902915077091070067066'
      .should.be.exactly(other('4)+k&C#VzJ4br>0wv%Yp', symbols, '0123456789'))
      .and.exactly(b85To10('4)+k&C#VzJ4br>0wv%Yp'));
  });
});
