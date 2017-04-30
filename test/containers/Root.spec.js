import React from 'react';
import { shallow } from 'enzyme';
import noop from 'lodash/noop';
import Root from '../../app/containers/Root';

describe('Root container', () => {
  let component;
  let props;
  beforeEach(() => {
    props = {
      store: {
        getState: noop,
        subscribe: noop,
        replaceReducer: noop,
        dispatch: noop
      }
    };

    component = shallow(<Root {...props} />);
  });

  it('should render without crashing', () => {
    const notExpectedValue = undefined;
    expect(component).not.toBe(notExpectedValue);
  });
});
