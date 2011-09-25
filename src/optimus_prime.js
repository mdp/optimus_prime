/* PrimeFinder
 * Copyright: Mark Percival, 2011 - <m@mdp.im>
 * License: MIT
 *
 * I wrote this on a whim on a lazy Sunday afternoon. It's extremely
 * naive, as it simply generates a random odd integer and sees if it
 * can divide evenly into a coprime.
 *
 * If every person on the earth loads this, and runs it continuously,
 * the sun will still burn out before it gets even close to cracking a
 * 2048 bit RSA modulus.
 *
 * But who gives shit. I like it.
 *
 */

function PrimeFinder(m) {
  this.m = m // The Modulus we are attempting to crack
}

PrimeFinder.HEXARRAY = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']

PrimeFinder.genRandomBigInt = function(bits) {
  // Just generates simple odd bigints
  var bytes = bits / 8;
  var hexInt = '00'; //Padding with 00
  for(i=0; i < bytes; i++) {
    hexInt += PrimeFinder.HEXARRAY[PrimeFinder.random(15)];
    if (i+1 == bytes) {
      // Make sure it's odd
      hexInt += PrimeFinder.HEXARRAY[PrimeFinder.random(7)*2+1];
    } else {
      hexInt += PrimeFinder.HEXARRAY[PrimeFinder.random(15)];
    }
  }
  return BigInteger.parse(hexInt,16);
}

PrimeFinder.random = function(upto) {
  return Math.floor(Math.random() * (upto + 1));
}

PrimeFinder.prototype.start = function(delay, callback){
  var self = this;
  var result = [];
  this.attempt(callback);
  setInterval(function(){
    self.attempt(callback);
  }, delay);
}

PrimeFinder.prototype.attemptWith = function(bInt) {
  return this.m.divRem(bInt);
}

PrimeFinder.prototype.attempt = function(callback){
  var pr = PrimeFinder.genRandomBigInt(1024);
  var result = [];
  result = this.attemptWith(pr);
  if (result[1].isZero()) {
    callback(pr, result[0]);
  } else {
    callback(pr);
  }
}
