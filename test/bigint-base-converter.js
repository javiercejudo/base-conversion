/*jshint node:true, mocha:true */

'use strict';

require('should');

var Big = require('arbitrary-precision')(require('bigjs-adapter'));
var toBigFactory = require('to-decimal-arbitrary-precision');
var d = toBigFactory(Big);

Big.Impl.E_POS = 40;

var symbols85 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~';

var other = require('bigint-base-converter');
var fn = require('../src/');

describe('bigint-base-converter', function() {
  it('supports custom symbols', function() {
    '10'
      .should.be.exactly(other('a', '0123456789a', '0123456789'))
      .and.exactly(fn.symbols('0123456789a', 11, 10, 'a'))
      .and.exactly(fn.toDecimal.symbols('0123456789a', 11, 'a'));
  });

  it('yields the same results from base 16', function() {
    var b16To10 = fn.toDecimal.big(d, 16);

    '21932261930451111902915077091070067066'
      .should.be.exactly(other('108000000000000000080800200C417A', '0123456789ABCDEF', '0123456789'))
      .and.exactly(b16To10('108000000000000000080800200C417A'));
  });

  it('yields the same results for base 16', function() {
    var b10To16 = fn.fromDecimal.big(d, 16);

    '108000000000000000080800200C417A'
      .should.be.exactly(other('21932261930451111902915077091070067066', '0123456789', '0123456789ABCDEF'))
      .and.exactly(b10To16('21932261930451111902915077091070067066'));
  });

  it('yields the same results from 16 to 85', function() {
    var b16To85 = fn.raw(d, symbols85, 16, 85);

    '4)+k&C#VzJ4br>0wv%Yp'
      .should.be.exactly(other('108000000000000000080800200C417A', '0123456789ABCDEF', symbols85))
      .and.exactly(b16To85('108000000000000000080800200C417A'));
  });

  it('yields the same results from 10 to 85', function() {
    var b10To85 = fn.fromDecimal.raw(d, symbols85, 85);

    '4)+k&C#VzJ4br>0wv%Yp'
      .should.be.exactly(other('21932261930451111902915077091070067066', '0123456789', symbols85))
      .and.exactly(b10To85('21932261930451111902915077091070067066'));
  });

  it('yields the same results from 85 to 16', function() {
    var b85To16 = fn.raw(d, symbols85, 85, 16);

    '108000000000000000080800200C417A'
      .should.be.exactly(other('4)+k&C#VzJ4br>0wv%Yp', symbols85, '0123456789ABCDEF'))
      .and.exactly(b85To16('4)+k&C#VzJ4br>0wv%Yp'));
  });

  it('yields the same results from 85 to 10', function() {
    '21932261930451111902915077091070067066'
      .should.be.exactly(other('4)+k&C#VzJ4br>0wv%Yp', symbols85, '0123456789'))
      .and.exactly(fn.toDecimal.raw(d, symbols85, 85, '4)+k&C#VzJ4br>0wv%Yp'));
  });
});
