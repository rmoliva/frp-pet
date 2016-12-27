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
  };

  // Registrar los componentes en la factoria
  factoryObject.register('text', componentDefinitions.text);
  factoryObject.register('button', componentDefinitions.button);

  describe('with a config component', function() {
    describe('text component', function() {
      const cmp = factoryObject.instance({
        type: 'text',
        disabled: true,
        text: 'text',
      });
      it('text should be text', function() {
        expect(cmp.state$().text).to.eql('text');
      });

      it('disabled should be true', function() {
        expect(cmp.state$().disabled).to.be.true;
      });
    });
    describe('button component', function() {
      const cmp = factoryObject.instance({
        type: 'button',
        disabled: true,
        clicked: true,
        value: 'value',
      });
      it('value should be value', function() {
        expect(cmp.state$().value).to.eql('value');
      });

      it('disabled should be true', function() {
        expect(cmp.state$().disabled).to.be.true;
      });

      it('clicked should be true', function() {
        expect(cmp.state$().clicked).to.be.true;
      });
    });
    describe('with unregistered component', function() {
      it('should throw an exception', function() {
        const cmp = factoryObject.instance({
          type: 'pepito',
          disabled: true,
        });


      });
    });
  });
});
