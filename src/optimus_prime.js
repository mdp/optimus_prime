/* OptimusPrime
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

function OptimusPrime(m) {
  this.m = m // The Modulus we are attempting to crack
}

OptimusPrime.HEXARRAY = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']

OptimusPrime.genRandomBigInt = function(bits) {
  // Just generates simple odd bigints
  var bytes = bits / 8;
  var hexInt = '00'; //Padding with 00
  for(i=0; i < bytes; i++) {
    hexInt += OptimusPrime.HEXARRAY[OptimusPrime.random(15)];
    if (i+1 == bytes) {
      // Make sure it's odd
      hexInt += OptimusPrime.HEXARRAY[OptimusPrime.random(7)*2+1];
    } else {
      hexInt += OptimusPrime.HEXARRAY[OptimusPrime.random(15)];
    }
  }
  return BigInteger.parse(hexInt,16);
}

OptimusPrime.random = function(upto) {
  return Math.floor(Math.random() * (upto + 1));
}

OptimusPrime.prototype.start = function(delay, callback){
  var self = this;
  var result = [];
  this.attempt(callback);
  setInterval(function(){
    self.attempt(callback);
  }, delay);
}

OptimusPrime.prototype.attemptWith = function(bInt) {
  return this.m.divRem(bInt);
}

OptimusPrime.prototype.attempt = function(callback){
  var pr = OptimusPrime.genRandomBigInt(1024);
  var result = [];
  result = this.attemptWith(pr);
  if (result[1].isZero()) {
    callback(pr, result[0]);
  } else {
    callback(pr);
  }
}
