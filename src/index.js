/*jshint node:true */

'use strict';

var toBigFactory = require('to-decimal-arbitrary-precision');
var toDecimal = require('base-conversion-to-dec');
var fromDecimal = require('base-conversion-from-dec');
var translate = require('string-translate');

var R = require('./R');

var defaultBig = toBigFactory(require('./Big'));
var defaultSymbols = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var toString = R.invoker(0, 'toString');

var convertBasesRaw = R.curryN(5, function(big, symbols, oldBase, newBase, n) {
  return R.pipe(
    toDecimal.raw(big, symbols, oldBase),
    fromDecimal.raw(big, symbols, newBase)
  )(n);
});

var convertBases = convertBasesRaw(defaultBig, defaultSymbols);

convertBases.big = convertBasesRaw(R.__, defaultSymbols);
convertBases.symbols = convertBasesRaw(defaultBig);
convertBases.raw = convertBasesRaw;

convertBases.toDecimal = toDecimal;
convertBases.fromDecimal = fromDecimal;

convertBases.translate = translate(defaultSymbols);
convertBases.translateRaw = translate;

convertBases.defaultSymbols = defaultSymbols;
convertBases.defaultBig = defaultBig;
toDecimal.__ = R.__;

module.exports = convertBases;
