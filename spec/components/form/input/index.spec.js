const chai = require('chai');
const expect = chai.expect;
const input = require('../../../../src/components/form/input/index');

describe('components/form/input', function() {
  const cmp = input();

  describe('initialState', function() {
    it('text should be empty', function() {
      expect(cmp.state$().text).to.eql('');
    });

    it('icon should be empty', function() {
      expect(cmp.state$().icon).to.eql('');
    });

    it('size should be empty', function() {
      expect(cmp.state$().size).to.eql('');
    });

    it('loading should be false', function() {
      expect(cmp.state$().loading).to.be.false;
    });

    it('disabled should be false', function() {
      expect(cmp.state$().disabled).to.be.false;
    });

    it('error should be false', function() {
      expect(cmp.state$().error).to.be.false;
    });

    it('fluid should be false', function() {
      expect(cmp.state$().fluid).to.be.false;
    });

    it('transparent should be false', function() {
      expect(cmp.state$().transparent).to.be.false;
    });
  });

  describe('setText', function() {
    beforeEach(function() {
      cmp.action$(cmp.actions.setText('hola'));
    });
    it('text should be set', function() {
      expect(cmp.state$().text).to.eql('hola');
    });
  });

  describe('setIcon', function() {
    beforeEach(function() {
      cmp.action$(cmp.actions.setIcon('icon'));
    });
    it('icon should be set', function() {
      expect(cmp.state$().icon).to.eql('icon');
    });
  });

  describe('setSize', function() {
    beforeEach(function() {
      cmp.action$(cmp.actions.setSize('size'));
    });
    it('size should be set', function() {
      expect(cmp.state$().size).to.eql('size');
    });
  });

  describe('setLoading', function() {
    beforeEach(function() {
      cmp.action$(cmp.actions.setLoading(true));
    });
    it('loading should be true', function() {
      expect(cmp.state$().loading).to.be.true;
    });
  });

  describe('setDisabled', function() {
    beforeEach(function() {
      cmp.action$(cmp.actions.setDisabled(true));
    });
    it('disabled should be true', function() {
      expect(cmp.state$().disabled).to.be.true;
    });
  });

  describe('setError', function() {
    beforeEach(function() {
      cmp.action$(cmp.actions.setError(true));
    });
    it('error should be true', function() {
      expect(cmp.state$().error).to.be.true;
    });
  });

  describe('setFluid', function() {
    beforeEach(function() {
      cmp.action$(cmp.actions.setFluid(true));
    });
    it('fluid should be true', function() {
      expect(cmp.state$().fluid).to.be.true;
    });
  });

  describe('setTransparent', function() {
    beforeEach(function() {
      cmp.action$(cmp.actions.setTransparent(true));
    });
    it('transparent should be true', function() {
      expect(cmp.state$().transparent).to.be.true;
    });
  });
});
