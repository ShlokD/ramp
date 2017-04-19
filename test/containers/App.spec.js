import React from 'react';
import { shallow } from 'enzyme';
import App from '../../app/containers/App';

describe('App container', () => {
  let component;

  beforeEach(() => {
    component = shallow(<App />);
  });

  it('should render without crashing', () => {
    expect(component).not.toBe(undefined);
  });

  it('should render a ramp text area', () => {
    expect(component.find('RampTextArea').length).toBe(1);
  });
});
