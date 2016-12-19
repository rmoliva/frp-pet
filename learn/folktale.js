'use strict';


// const cmp = require('./component');
// console.log(cmp());

// We load the library by "require"-ing it
const Maybe = require('folktale/data/maybe');
const Inspect = require('folktale').core.inspect;
console.log(Inspect(Maybe));

// Returns Maybe.Just(x) if some `x` passes the predicate test
// Otherwise returns Maybe.Nothing()
function find(predicate, xs) {
  return xs.reduce(function(result, x) {
    return result.orElse(function() {
      return predicate(x)?    Maybe.Just(x)
      :      /* otherwise */  Maybe.Nothing()
    })
  }, Maybe.Nothing())
}

var numbers = [1, 2, 3, 4, 5]

var anyGreaterThan2 = find(function(a) { return a > 2 }, numbers)
console.log(Inspect(anyGreaterThan2));

var anyGreaterThan8 = find(function(a) { return a > 8 }, numbers)
console.log(Inspect(anyGreaterThan8));
