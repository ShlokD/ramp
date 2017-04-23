import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import RampTextArea from '../../app/components/RampTextArea';
import { OPEN, CLOSE } from '../../app/constants/stringConstants';
import { findProp, areDeeplyEqual } from '../test-utils/testUtilities';

describe('RampTextArea', () => {
  let component;
  let sandbox;
  let onTextChangeSpy;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    component = shallow(<RampTextArea />);
    onTextChangeSpy = sandbox.spy(component.instance(), 'onTextChange');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should exist', () => {
    const notExpectedValue = undefined;
    expect(component).not.toBe(notExpectedValue);
  });

  it('should set correct state', () => {
    const initState = {
      menuState: CLOSE,
      text: ''
    };
    const expectedValue = true;
    expect(areDeeplyEqual(component.state(), initState)).toBe(expectedValue);
  });

  it('should render app bar', () => {
    const expectedLength = 1;
    const actualLength = component.find('AppBar').length;
    expect(actualLength).toBe(expectedLength);
  });

  it('should render drawer', () => {
    const expectedLength = 1;
    const actualValue = component.find('RampMenuDrawer').length;
    expect(actualValue).toBe(expectedLength);
  });

  it('should render text area', () => {
    const expectedPropValue = 1;
    const actualPropValue = component.find('textarea').length;
    expect(actualPropValue).toBe(expectedPropValue);
  });

  describe('Composite Component Assertions', () => {
    let compositeComponent;

    describe('RampMenuDrawer', () => {
      beforeEach(() => {
        compositeComponent = component.find('RampMenuDrawer');
      });

      it('should set correct prop isOpen for drawer', () => {
        const expectedPropValue = false;
        const actualPropValue = findProp(compositeComponent, 'isOpen');
        expect(actualPropValue).toBe(expectedPropValue);
      });

      it('should set correct prop text for drawer', () => {
        const expectedPropValue = '';
        const actualPropValue = findProp(compositeComponent, 'text');
        expect(actualPropValue).toBe(expectedPropValue);
      });

      it('should set correct prop onMenuItemClick for drawer', () => {
        const expectedPropValue = component.instance().onMenuButtonClick;
        const actualPropValue = findProp(compositeComponent, 'onMenuItemClick');
        expect(actualPropValue).toBe(expectedPropValue);
      });
    });

    describe('text area', () => {
      beforeEach(() => {
        compositeComponent = component.find('textarea');
      });

      it('should call instance onTextChange function when textarea changes', () => {
        component.find('textarea').simulate('change');
        const expectedCallCountValue = 1;
        const actualCallCountValue = onTextChangeSpy.callCount;
        expect(actualCallCountValue).toBe(expectedCallCountValue);
      });
    });
  });

  describe('instance methods', () => {
    let instance;
    beforeEach(() => {
      instance = component.instance();
    });

    describe('onMenuButtonClick', () => {
      beforeEach(() => {
        instance.onMenuButtonClick();
      });

      it('should set correct state', () => {
        const changedState = {
          menuState: OPEN,
          text: ''
        };
        const expectedValue = true;
        const actualValue = areDeeplyEqual(instance.state, changedState);
        expect(actualValue).toBe(expectedValue);
      });

      it('should change props for menu drawer', () => {
        const expectedPropValue = true;
        const actualPropValue = findProp(component.find('RampMenuDrawer'), 'isOpen');
        expect(actualPropValue).toBe(expectedPropValue);
      });
    });

    describe('onTextChange', () => {
      beforeEach(() => {
        instance.onTextChange('changedText');
      });

      it('should set correct state', () => {
        const changedState = {
          menuState: CLOSE,
          text: 'changedText'
        };
        const expectedValue = true;
        const actualValue = areDeeplyEqual(instance.state, changedState);
        expect(actualValue).toBe(expectedValue);
      });

      it('should set correct value for prop text for menu drawer', () => {
        const expectedPropValue = '';
        const actualPropValue = findProp(component.find('RampMenuDrawer'), 'text');
        expect(actualPropValue).toBe(expectedPropValue);
      });
    });

    describe('open menu after text change', () => {
      beforeEach(() => {
        instance.onTextChange('changedText');
        instance.onMenuButtonClick();
      });

      it('should set correct state', () => {
        const changedState = {
          menuState: OPEN,
          text: 'changedText'
        };

        const expectedValue = true;
        const actualValue = areDeeplyEqual(instance.state, changedState);
        expect(actualValue).toBe(expectedValue);
      });

      it('should set correct value for prop isOpen for menu drawer', () => {
        const expectedPropValue = true;
        const actualPropValue = findProp(component.find('RampMenuDrawer'), 'isOpen');
        expect(actualPropValue).toBe(expectedPropValue);
      });

      it('should set correct value for prop text for menu drawer', () => {
        const expectedPropValue = 'changedText';
        const actualPropValue = findProp(component.find('RampMenuDrawer'), 'text');
        expect(actualPropValue).toBe(expectedPropValue);
      });
    });
  });
});
