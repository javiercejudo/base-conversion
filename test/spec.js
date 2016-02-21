/*jshint node:true, mocha:true */

'use strict';

require('should');

var R = require('ramda');
var Big = require('arbitrary-precision')(require('bigjs-adapter'));
var toBigFactory = require('to-decimal-arbitrary-precision');

var bc = require('../src/');

describe('base conversion', function() {
  it('hexadecimal to binary', function() {
    var hexToBin = bc(16, 2);

    hexToBin('A').should.be.exactly('1010');
    hexToBin('1E').should.be.exactly('11110');
  });

  it('large decimal to base 9', function() {
    var d = toBigFactory(Big);

    Big.Impl.E_POS = 50;

    bc.big(d, 10, 9, '5678364565345634563456346757364563534534645745')
      .should.be.exactly('802531310452364303450750087576673257456135727727');
  });

  it('octal to duodecimal', function() {
    bc(8, 12, '73').should.be.exactly('4B');
  });

  it('quinary to base 32', function() {
    var quiToB32 = bc(5, 32);

    quiToB32('2312124222213').should.be.exactly('JAVIER');
    quiToB32('30333330434').should.be.exactly('TAOCP');
  });

  it('decimal to base 62', function() {
    var decTo62 = bc(10, 62);

    decTo62('60').should.be.exactly('y');
    decTo62('63').should.be.exactly('11');
  });

  it('should support custom symbols', function() {
    bc.symbols('⓿①②③④⑤⑥⑦⑧⑨ⒶⒷ', 8, 12, '⑦③').should.be.exactly('④Ⓑ');
  });

  it('should expose the raw converter', function() {
    var d = toBigFactory(Big);

    Big.Impl.E_POS = 50;

    bc.raw(d, '01234#6789', 10, 9, '#678364#6#34#634#634#63467#7364#63#34#3464#74#')
      .should.be.exactly('802#313104#23643034#07#0087#766732#74#613#727727');
  });

  it('supports translating to different sets of symbols', function() {
    var hexToDuo = R.pipe(bc(16, 12), bc.translate('0123456789ᘔƐ'));

    hexToDuo('10B').should.be.exactly('1ᘔ3');
  });

  it('supports translating to different sets of symbols', function() {
    var mySymbols = '⓿①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮';
    var myTranslate = bc.translateRaw(mySymbols);

    var hexToDuoFancy = bc.symbols(mySymbols, 16, 12);
    var hexToDuoCustom = R.pipe(hexToDuoFancy, myTranslate('0123456789ᘔƐ'));

    hexToDuoFancy('①⓿⑪').should.be.exactly('①⑩③');
    hexToDuoCustom('①⓿⑪').should.be.exactly('1ᘔ3');
  });

  it.skip('non-integer decimal to base 9', function() {
    bc(10, 9, '10.10').should.be.exactly('11.08');
  });
});
