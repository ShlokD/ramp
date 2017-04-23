import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../app/containers/Root';

describe('Root container', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Root />);
  });

  it('should render without crashing', () => {
    const notExpectedValue = undefined;
    expect(component).not.toBe(notExpectedValue);
  });
});
