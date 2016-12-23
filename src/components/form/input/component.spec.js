const chai = require('chai');
const expect = chai.expect;
const flyd = require('flyd');
const M = require('monet');
const input = require('./component');

describe('components/form/input', function() {
  describe('initialState', function() {
    const cmp = input();
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
    const cmp = input();
    describe('Some', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setText(M.Some('hola')));
      });
      it('text should be set', function() {
        expect(cmp.state$().text).to.eql('hola');
      });
    });
    describe('None', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setText(M.None()));
      });
      it('text should not be set', function() {
        expect(cmp.state$().text).to.eql('');
      });
    });
  });

  describe('setIcon', function() {
    const cmp = input();
    describe('Some', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setIcon(M.Some('icon')));
      });
      it('icon should be set', function() {
        expect(cmp.state$().icon).to.eql('icon');
      });
    });
    describe('None', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setIcon(M.None()));
      });
      it('icon should not be set', function() {
        expect(cmp.state$().icon).to.eql('');
      });
    });
  });

  describe('setLabel', function() {
    const cmp = input();
    describe('Some', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setLabel(M.Some('label')));
      });
      it('label should be set', function() {
        expect(cmp.state$().label).to.eql('label');
      });
    });
    describe('None', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setLabel(M.None()));
      });
      it('label should not be set', function() {
        expect(cmp.state$().label).to.eql('');
      });
    });
  });

  describe('setSize', function() {
    const cmp = input();
    describe('Some', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setSize(M.Some('size')));
      });
      it('size should be set', function() {
        expect(cmp.state$().size).to.eql('size');
      });
    });
    describe('None', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setSize(M.None()));
      });
      it('size should not be set', function() {
        expect(cmp.state$().size).to.eql('');
      });
    });
  });

  describe('setWide', function() {
    const cmp = input();
    describe('Some', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setWide(M.Some(10)));
      });
      it('size should be set', function() {
        expect(cmp.state$().wide).to.eql(10);
      });
    });
    describe('None', function() {
      beforeEach(function() {
        cmp.action$(cmp.actions.setWide(M.None()));
      });
      it('size should not be set', function() {
        expect(cmp.state$().wide).to.eql(0);
      });
    });
  });

  describe('setDisabled', function() {
    const cmp = input();
    beforeEach(function() {
      cmp.action$(cmp.actions.setDisabled(true));
    });
    it('disabled should be true', function() {
      expect(cmp.state$().disabled).to.be.true;
    });
  });

  describe('setError', function() {
    const cmp = input();
    beforeEach(function() {
      cmp.action$(cmp.actions.setError(true));
    });
    it('error should be true', function() {
      expect(cmp.state$().error).to.be.true;
    });
  });

  describe('setFluid', function() {
    const cmp = input();
    beforeEach(function() {
      cmp.action$(cmp.actions.setFluid(true));
    });
    it('fluid should be true', function() {
      expect(cmp.state$().fluid).to.be.true;
    });
  });

  describe('setInline', function() {
    const cmp = input();
    beforeEach(function() {
      cmp.action$(cmp.actions.setInline(true));
    });
    it('inline should be true', function() {
      expect(cmp.state$().inline).to.be.true;
    });
  });

  describe('setLoading', function() {
    const cmp = input();
    beforeEach(function() {
      cmp.action$(cmp.actions.setLoading(true));
    });
    it('loading should be true', function() {
      expect(cmp.state$().loading).to.be.true;
    });
  });

  describe('setReadOnly', function() {
    const cmp = input();
    beforeEach(function() {
      cmp.action$(cmp.actions.setReadOnly(true));
    });
    it('readonly should be true', function() {
      expect(cmp.state$().readonly).to.be.true;
    });
  });

  describe('setRequired', function() {
    const cmp = input();
    beforeEach(function() {
      cmp.action$(cmp.actions.setRequired(true));
    });
    it('required should be true', function() {
      expect(cmp.state$().required).to.be.true;
    });
  });

  describe('setTransparent', function() {
    const cmp = input();
    beforeEach(function() {
      cmp.action$(cmp.actions.setTransparent(true));
    });
    it('transparent should be true', function() {
      expect(cmp.state$().transparent).to.be.true;
    });
  });
});
