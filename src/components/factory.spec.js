const chai = require('chai');
const expect = chai.expect;
const R = require('ramda');
const factory = require('./factory');

describe('components/factory', function() {
  // TODO
  const isMaybe = R.T;

  // Objeto global de factory
  const factoryObject = factory();

  // Definir estado inicial
  const initialStates = {
    text: {
      disabled: false,
      text: '',
    },
    button: {
      disabled: false,
      click: false,
      value: '',
    },
    input: {
      disabled: false,
      text: '',
    },
  };

  // Definir action types de prueba
  const actionTypes = {
    text: {
      setDisabled: [Boolean],
      setText: [isMaybe],
    },
    button: {
      setDisabled: [Boolean],
      click: [Boolean],
      setValue: [isMaybe],
    },
    input: {
      setDisabled: [Boolean],
      setText: [isMaybe],
    },
  };

  // Definir la resolucion de los actionTypes
  const actionCases = {
    text: function(state) {
      return {
        // setDisabled:: (boolean) => state
        setDisabled: (disabled) => R.merge(state, {disabled: disabled}),
        // setText:: (Maybe) => state
        setText: (text) => R.merge(state, {text: text.orSome('')}),
      };
    },
    button: function(state) {
      return {
        // setDisabled:: (boolean) => state
        setDisabled: (disabled) => R.merge(state, {disabled: disabled}),
        // setClick:: (boolean) => state
        setClick: (click) => R.merge(state, {click: click}),
        // setValue:: (Maybe) => state
        setValue: (value) => R.merge(state, {value: value.orSome('')}),
      };
    },
    input: function(state) {
      return {
        // setDisabled:: (boolean) => state
        setDisabled: (disabled) => R.merge(state, {disabled: disabled}),
        // setText:: (Maybe) => state
        setText: (text) => R.merge(state, {text: text.orSome('')}),
      };
    },
  };

  const componentDefinitions = {
    text: {
      initialState: initialStates.text,
      actionTypes: actionTypes.text,
      actionCase: actionCases.text,
    },
    button: {
      initialState: initialStates.button,
      actionTypes: actionTypes.button,
      actionCase: actionCases.button,
    },
    input: {
      initialState: initialStates.input,
      actionTypes: actionTypes.input,
      actionCase: actionCases.input,
    },
  };

  // Registrar dos componentes en la factoria
  factoryObject.register('text', componentDefinitions.text);
  factoryObject.register('button', componentDefinitions.button);

  describe('with unregistered component', function() {
    it('should throw an exception', function() {
      expect(() => factoryObject.instance({
        type: 'pepito',
        disabled: true,
      })).to.throw(Error);
    });
  });

  describe('with no component type', function() {
    it('should throw an exception', function() {
      expect(() => factoryObject.instance({
        disabled: true,
      })).to.throw(Error);
    });
  });

  describe('with a config component', function() {
    describe('text component', function() {
      const treeNode = factoryObject.instance({
        type: 'text',
        disabled: true,
        text: 'text',
      });
      it('text should be text', function() {
        expect(treeNode.data.state$().text).to.eql('text');
      });

      it('disabled should be true', function() {
        expect(treeNode.data.state$().disabled).to.be.true;
      });
    });
    describe('button component', function() {
      beforeEach(function() {
        this.buttonNode = factoryObject.instance({
          type: 'button',
          disabled: true,
          clicked: true,
          value: 'value',
        });
      });

      it('value should be value', function() {
        expect(this.buttonNode.data.state$().value).to.eql('value');
      });

      it('disabled should be true', function() {
        expect(this.buttonNode.data.state$().disabled).to.be.true;
      });

      it('clicked should be true', function() {
        expect(this.buttonNode.data.state$().clicked).to.be.true;
      });
    });
  });
  describe('with a tree config component', function() {
    beforeEach(function() {
      this.treeNode = factoryObject.instance({
        type: 'text',
        disabled: true,
        text: 'text',
        items: [{
          type: 'button',
          disabled: true,
          value: 'value1',
          clicked: true,
        }, {
          type: 'button',
          disabled: false,
          value: 'value2',
        }],
      });
    });

    describe('parent component', function() {
      it('should have two children', function() {
        expect(this.treeNode.children.length).to.eql(2);
      });
    });

    describe('first children component', function() {
      beforeEach(function() {
        this.treeChild = factoryObject.treeManager.findNodeById(
          this.treeNode.children[0]
        );
      });

      it('should have a parent', function() {
        expect(this.treeChild.parent).to.eql(this.treeNode.id);
      });

      it('should be of type button', function() {
        expect(this.treeChild.data.state$().type).to.eql('button');
      });

      it('value should be value', function() {
        expect(this.treeChild.data.state$().value).to.eql('value1');
      });

      it('disabled should be true', function() {
        expect(this.treeChild.data.state$().disabled).to.be.true;
      });

      it('clicked should be true', function() {
        expect(this.treeChild.data.state$().clicked).to.be.true;
      });
    });

    describe('second children component', function() {
      beforeEach(function() {
        this.treeChild = factoryObject.treeManager.findNodeById(
          this.treeNode.children[1]
        );
      });

      it('should have a parent', function() {
        expect(this.treeChild.parent).to.eql(this.treeNode.id);
      });

      it('should be of type button', function() {
        expect(this.treeChild.data.state$().type).to.eql('button');
      });

      it('value should be value', function() {
        expect(this.treeChild.data.state$().value).to.eql('value2');
      });

      it('disabled should be false', function() {
        expect(this.treeChild.data.state$().disabled).to.be.false;
      });
    });
  });
});
