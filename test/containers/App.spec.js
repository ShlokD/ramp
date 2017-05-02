import React from 'react';
import { shallow } from 'enzyme';
import App from '../../app/containers/App';

describe('App container', () => {
  let component;

  beforeEach(() => {
    component = shallow(<App />);
  });

  it('should render without crashing', () => {
    const notExpectedValue = undefined;
    expect(component).not.toBe(notExpectedValue);
  });

  it('should render a ramp text area wrapper', () => {
    const expectedValue = 1;
    const actualValue = component.find('RampTextAreaWrapper').length;
    expect(actualValue).toBe(expectedValue);
  });
});
