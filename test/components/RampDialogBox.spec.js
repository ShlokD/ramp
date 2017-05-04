import React from 'react';
import { shallow } from 'enzyme';

import RampDialogBox from '../../app/components/RampDialogBox';
import { areDeeplyEqual, findProp } from '../test-utils/testUtilities';
import { OPEN, CLOSE, SAVE_FILE_ERRORED, SAVE_FILE_COMPLETED, SAVE_FILE_IN_PROGRESS } from '../../app/constants/stringConstants';

describe('RampDialogBox', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      saveState: {
        status: ''
      }
    };

    component = shallow(<RampDialogBox {...props} />);
  });

  it('should exist', () => {
    expect(component).not.toBe(undefined);
  });

  it('should set correct initial state', () => {
    const expectedState = { visibility: CLOSE };
    const actualState = component.state();
    expect(areDeeplyEqual(actualState, expectedState)).toBe(true);
  });

  it('should render a dialog', () => {
    const expected = 1;
    const actual = component.find('Dialog').length;
    expect(actual).toBe(expected);
  });

  it('should initial render dialog as closed', () => {
    const expected = false;
    const actual = findProp(component.find('Dialog'), 'open');
    expect(actual).toBe(expected);
  });

  it('should render empty title', () => {
    const expected = '';
    const actual = findProp(component.find('Dialog'), 'title');
    expect(actual).toBe(expected);
  });

  describe('Titles', () => {
    it('should render correct title for progress', () => {
      props.saveState.status = SAVE_FILE_IN_PROGRESS;
      component = shallow(<RampDialogBox {...props} />);
      const expected = 'Saving file...';
      const actual = findProp(component.find('Dialog'), 'title');
      expect(actual).toBe(expected);
    });

    it('should render correct title for success', () => {
      props.saveState.status = SAVE_FILE_COMPLETED;
      component = shallow(<RampDialogBox {...props} />);
      const expected = 'File Saved';
      const actual = findProp(component.find('Dialog'), 'title');
      expect(actual).toBe(expected);
    });

    it('should render correct title for error', () => {
      props.saveState.status = SAVE_FILE_ERRORED;
      component = shallow(<RampDialogBox {...props} />);
      const expected = 'There was an error saving the file';
      const actual = findProp(component.find('Dialog'), 'title');
      expect(actual).toBe(expected);
    });
  });

  describe('instance methods', () => {
    let instance;
    beforeEach(() => {
      instance = component.instance();
    });

    describe('componentWillReceiveProps', () => {
      it('should set visibility to OPEN if saveStatus is not empty', () => {
        instance.componentWillReceiveProps({
          saveState: {
            status: SAVE_FILE_COMPLETED
          }
        });
        const expected = { visibility: OPEN };
        const actual = instance.state;
        expect(areDeeplyEqual(actual, expected)).toBe(true);
      });

      it('should not set visibility to OPEN if saveStatus is not empty but same as current', () => {
        props.saveState.status = SAVE_FILE_IN_PROGRESS;
        component = shallow(<RampDialogBox {...props} />);
        instance = component.instance();
        instance.componentWillReceiveProps({
          saveState: {
            status: SAVE_FILE_IN_PROGRESS
          }
        });
        const expected = { visibility: CLOSE };
        const actual = instance.state;
        expect(areDeeplyEqual(actual, expected)).toBe(true);
      });
    });

    describe('onCloseDialog', () => {
      it('should set correct state', () => {
        instance.onCloseDialog();
        const expected = { visibility: CLOSE };
        const actual = instance.state;
        expect(areDeeplyEqual(actual, expected)).toBe(true);
      });
    });

    describe('renderCloseButton', () => {
      let closeButton;
      beforeEach(() => {
        closeButton = instance.renderCloseButton();
      });

      it('should render a flat button', () => {
        const expected = 'FlatButton';
        const actual = closeButton.type.muiName;
        expect(actual).toBe(expected);
      });

      it('should set label', () => {
        const expected = 'Close';
        const actual = closeButton.props.label;
        expect(actual).toBe(expected);
      });

      it('should set onTouchTap', () => {
        const expected = instance.onCloseDialog;
        const actual = closeButton.props.onTouchTap;
        expect(actual).toBe(expected);
      });
    });
  });
});
