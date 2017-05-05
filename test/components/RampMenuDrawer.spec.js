import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ContentClear from 'material-ui/svg-icons/content/clear';
import Done from 'material-ui/svg-icons/action/done';
import RampMenuDrawer from '../../app/components/RampMenuDrawer';
import { areDeeplyEqual, findProp, contains } from '../test-utils/testUtilities';

describe('RampMenuDrawer', () => {
  let component;
  let props;
  let sandbox;
  let onMenuItemClickSpy;
  let onSaveSpy;
  let clock;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    clock = sinon.useFakeTimers();
    onMenuItemClickSpy = sandbox.spy();
    onSaveSpy = sandbox.spy();
    props = {
      isOpen: true,
      text: 'Some text. it has words. in it',
      begin: 0,
      onMenuItemClick: onMenuItemClickSpy,
      onSaveButtonClick: onSaveSpy
    };
    component = shallow(<RampMenuDrawer {...props} />);
  });

  afterEach(() => {
    clock.restore();
    sandbox.restore();
  });

  it('should exist', () => {
    const notExpectedValue = undefined;
    expect(component).not.toBe(notExpectedValue);
  });

  it('should set correct state', () => {
    const expectedState = {
      wordsWritten: 0,
      uniqueWords: 0,
      sessionDuration: 0
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

  it('should render 3 menuItems', () => {
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

    describe('second menu item', () => {
      beforeEach(() => {
        compositeComponent = component.find('MenuItem').at(1);
      });

      it('should set correct value for primaryText', () => {
        const expectedPropValue = 'Save';
        const actualPropValue = findProp(compositeComponent, 'primaryText');
        expect(actualPropValue).toBe(expectedPropValue);
      });

      it('should set correct value for leftIcon', () => {
        const expectedPropValue = <Done />;
        const actualPropValue = findProp(compositeComponent, 'leftIcon');
        const expectedAssertion = true;
        const actualAssertion = areDeeplyEqual(actualPropValue, expectedPropValue);
        expect(actualAssertion).toBe(expectedAssertion);
      });

      it('should set correct value for menuItem on touchTap', () => {
        compositeComponent.simulate('touchTap');
        const expectedCallCount = 1;
        const actualCallCount = onSaveSpy.callCount;
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

      it('should render title for session duration', () => {
        const expectedAssertion = true;
        const actualAssertion = contains(compositeComponent.text(), 'Session Duration');
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

      it('should set correct text for session duration', () => {
        const expectedText = '00:00';
        const actualText = compositeComponent.find('.rampSessionDuration').text();
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
          uniqueWords: 5,
          sessionDuration: 0
        };
        const actualState = instance.state;
        expect(areDeeplyEqual(actualState, expectedState)).toBe(true);
      });
    });

    describe('tick', () => {
      beforeEach(() => {
        clock.tick(5000);
        instance.tick();
      });

      it('should set correct state', () => {
        const expectedState = 5000;
        const actualState = instance.state.sessionDuration;
        expect(actualState).toBe(expectedState);
      });

      it('should set correct text for session duration', () => {
        const expected = '00:05';
        const actual = component.find('.rampSessionDuration').text();
        expect(actual).toBe(expected);
      });
    });
  });
});
