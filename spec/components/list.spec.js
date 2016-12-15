const chai = require('chai');
const expect = chai.expect;
const logger = require('../../src/logger');
const component = require('../../src/components/list');

describe('component/list', function() {
  const cmp = component();

  describe('initialState', function() {
    it('should have empty records', function() {
      expect(cmp.state$().records).to.eql([]);
    });
  });

  describe('loadRecords', function() {
    beforeEach(function() {
      cmp.action$(cmp.actions.loadRecords());
    });

    it('should have empty records filled', function() {
      expect(cmp.state$().records).to.eql([]);
    });
  });
});
