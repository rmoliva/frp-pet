const chai = require('chai');
const expect = chai.expect;
const logger = require('../src/logger');
const component = require('../src/component');

describe('Test component', function() {
  const cmp = component();
  it('should fail', function() {
    expect(false).to.be.false;
  });

  describe('initialState', function() {
    it('should have empty records', function() {
      expect(cmp.state$().records).to.eql([]);
    });

    it('should have total to be 0', function() {
      expect(cmp.state$().total).to.eql(0);
    });

    it('should have page to be 1', function() {
      expect(cmp.state$().page).to.eql(1);
    });
  });

  describe('setRecords', function() {
    const records = [{
      id: 1,
      name: 'Uno',
    }, {
      id: 2,
      name: 'Dos',
    }];

    beforeEach(function() {
      cmp.action$(cmp.actions.setRecords(
        records,
        records.length
      ));
    });

    it('should have empty records filled', function() {
      expect(cmp.state$().records).to.eql(records);
    });

    it('should have total to be 0', function() {
      logger.pp(cmp.state$());
      expect(cmp.state$().total).to.eql(records.length);
    });

    it('should have page to be 1', function() {
      expect(cmp.state$().page).to.eql(1);
    });
  });
});
