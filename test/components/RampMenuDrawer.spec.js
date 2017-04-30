import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ContentClear from 'material-ui/svg-icons/content/clear';
import RampMenuDrawer from '../../app/components/RampMenuDrawer';
import { areDeeplyEqual, findProp, contains } from '../test-utils/testUtilities';

describe('RampMenuDrawer', () => {
  let component;
  let props;
  let sandbox;
  let onMenuItemClickSpy;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    onMenuItemClickSpy = sandbox.spy();
    props = {
      isOpen: true,
      text: 'Some text. it has words. in it',
      onMenuItemClick: onMenuItemClickSpy
    };
    component = shallow(<RampMenuDrawer {...props} />);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should exist', () => {
    const notExpectedValue = undefined;
    expect(component).not.toBe(notExpectedValue);
  });

  it('should set correct state', () => {
    const expectedState = {
      wordsWritten: 0,
      uniqueWords: 0
    };
    const expectedAssertion = true;
    const actualAssertion = areDeeplyEqual(component.state(), expectedState);
    expect(actualAssertion).toBe(expectedAssertion);
  });

  it('should render drawer', () => {
    const expectedLength = 1;
    const actualLength = component.find('Drawer').length;
    expect(actualLength).toBe(expectedLength);
  });

  it('should render 2 menuItems', () => {
    const expectedLength = 3;
    const actualLength = component.find('MenuItem').length;
    expect(actualLength).toBe(expectedLength);
  });

  describe('Composite Component Assertions', () => {
    let compositeComponent;
    describe('Drawer', () => {
      beforeEach(() => {
        compositeComponent = component.find('Drawer');
      });

      it('should set correct value for prop open', () => {
        const expectedPropValue = true;
        const actualPropValue = findProp(compositeComponent, 'open');
        expect(actualPropValue).toBe(expectedPropValue);
      });

      it('should set correct value for prop width', () => {
        const expectedPropValue = 300;
        const actualPropValue = findProp(compositeComponent, 'width');
        expect(actualPropValue).toBe(expectedPropValue);
      });
    });

    describe('first menu item', () => {
      beforeEach(() => {
        compositeComponent = component.find('MenuItem').at(0);
      });

      it('should set correct value for primaryText', () => {
        const expectedPropValue = 'Close';
        const actualPropValue = findProp(compositeComponent, 'primaryText');
        expect(actualPropValue).toBe(expectedPropValue);
      });

      it('should set correct value for leftIcon', () => {
        const expectedPropValue = <ContentClear />;
        const actualPropValue = findProp(compositeComponent, 'leftIcon');
        const expectedAssertion = true;
        const actualAssertion = areDeeplyEqual(actualPropValue, expectedPropValue);
        expect(actualAssertion).toBe(expectedAssertion);
      });

      it('should set correct value for menuItem on touchTap', () => {
        compositeComponent.simulate('touchTap');
        const expectedCallCount = 1;
        const actualCallCount = onMenuItemClickSpy.callCount;
        expect(actualCallCount).toBe(expectedCallCount);
      });
    });

    describe('third menu item', () => {
      beforeEach(() => {
        compositeComponent = component.find('MenuItem').at(2);
      });

      it('should render words written', () => {
        const expectedLength = 1;
        const actualLength = compositeComponent.find('.rampWordsWritten').length;
        expect(actualLength).toBe(expectedLength);
      });

      it('should render title for words written', () => {
        const expectedAssertion = true;
        const actualAssertion = contains(compositeComponent.text(), 'Words Written');
        expect(actualAssertion, expectedAssertion);
      });

      it('should render title for unique words written', () => {
        const expectedAssertion = true;
        const actualAssertion = contains(compositeComponent.text(), 'Unique Words');
        expect(actualAssertion, expectedAssertion);
      });

      it('should set correct text for words written', () => {
        const expectedText = '0';
        const actualText = compositeComponent.find('.rampWordsWritten').text();
        expect(actualText).toBe(expectedText);
      });

      it('should set correct text for unique words written', () => {
        const expectedText = '0';
        const actualText = compositeComponent.find('.rampUniqueWords').text();
        expect(actualText).toBe(expectedText);
      });
    });
  });

  describe('instance methods', () => {
    let instance;

    beforeEach(() => {
      instance = component.instance();
    });

    describe('componentWillReceiveProps', () => {
      beforeEach(() => {
        instance.componentWillReceiveProps(props);
      });

      it('should set word count in state from prop text', () => {
        const expectedState = {
          wordsWritten: 7,
          uniqueWords: 5
        };
        const expectedValue = true;
        const actualValue = areDeeplyEqual(instance.state, expectedState);
        expect(actualValue).toBe(expectedValue);
      });
    });
  });
});
