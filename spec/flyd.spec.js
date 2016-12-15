const chai = require('chai');
const expect = chai.expect;
const flyd = require('flyd');
const logger = require('../src/logger');

describe('flyd', function() {
  describe('scan', function() {
    it('has initial acc as value when stream is undefined', function() {
      const numbers = flyd.stream();
      const scan = flyd.scan(function(sum, n) {
        return sum + n;
      }, 0, numbers);
      expect(scan()).to.eql(0);
    });
    it('can sum streams of integers', function() {
      const numbers = flyd.stream();
      const scan = flyd.scan(function(sum, n) {
        return sum + n;
      }, 0, numbers);
      numbers(3)(2)(4)(10);
      expect(scan()).to.eql(19);
    });
    it('is curried', function() {
      const numbers = flyd.stream();
      const sumStream = flyd.scan(function(sum, n) {
        return sum + n;
      }, 0);
      const scan = sumStream(numbers);
      numbers(3)(2)(4)(10);
      expect(scan()).to.eql(19);
    });
    it('passes undefined', function() {
      const x = flyd.stream();
      const scan = flyd.scan(function(acc, x) {
        return acc.concat([x]);
      }, [], x);

      x(1)(2)(undefined)(3)(4);

      expect(scan()).to.eql([1, 2, undefined, 3, 4]);
    });
  });
});
