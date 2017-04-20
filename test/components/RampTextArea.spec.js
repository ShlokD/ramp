import React from 'react';
import { shallow } from 'enzyme';
import RampTextArea from '../../app/components/RampTextArea';


describe('RampTextArea', () => {
  let component;
  beforeEach(() => {
    component = shallow(<RampTextArea />);
  });

  it('should exist', () => {
    expect(component).not.toBe(undefined);
  });

  it('should render app bar', () => {
    expect(component.find('AppBar').length).toBe(1);
  });

  it('should render text area', () => {
    expect(component.find('textarea').length).toBe(1);
  });
});
