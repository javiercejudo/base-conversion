/*jshint node:true */

'use strict';

var toBigFactory = require('to-decimal-arbitrary-precision');
var toDecimal = require('base-conversion-to-dec');
var fromDecimal = require('base-conversion-from-dec');
var translate = require('string-translate');

var R = require('./R');

var defaultB = toBigFactory(require('./Big'));
var defaultSymbols = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var toString = R.invoker(0, 'toString');

var convertBasesRaw = R.curryN(5, function(b, symbols, oldBase, newBase, n) {
  return R.pipe(
    toDecimal.raw(b, symbols, oldBase),
    fromDecimal.raw(b, symbols, newBase)
  )(n);
});

var convertBases = convertBasesRaw(defaultB, defaultSymbols);

convertBases.big = convertBasesRaw(R.__, defaultSymbols);
convertBases.symbols = convertBasesRaw(defaultB);
convertBases.raw = convertBasesRaw;

convertBases.toDecimal = toDecimal;
convertBases.fromDecimal = fromDecimal;

convertBases.translate = translate(defaultSymbols);
convertBases.translateRaw = translate;

convertBases.defaultSymbols = defaultSymbols;
convertBases.defaultB = defaultB;

module.exports = convertBases;
