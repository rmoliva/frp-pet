const chai = require('chai');
const expect = chai.expect;
const fields = require('./component');
const baseComponent = require('../../base');

describe('components/fields', function() {
  describe('initialState', function() {
    const cmp = baseComponent(fields)();

    it('type should be fields', function() {
      expect(cmp.state$().type).to.eql('fields');
    });

    it('visible should be true', function() {
      expect(cmp.state$().visible).to.be.true;
    });
  });

  describe('setVisible', function() {
    const cmp = baseComponent(fields)();
    beforeEach(function() {
      cmp.action$(cmp.actions.setVisible(false));
    });
    it('visible should be false', function() {
      expect(cmp.state$().visible).to.be.false;
    });
  });
});
