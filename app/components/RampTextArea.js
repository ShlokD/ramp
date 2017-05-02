import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import get from 'lodash/get';
import noop from 'lodash/noop';

import AppBar from 'material-ui/AppBar';
import RampMenuDrawer from './RampMenuDrawer';
import RampDialogBox from './RampDialogBox';
import styles from '../styles/RampTextArea.css';
import { OPEN, CLOSE } from '../constants/stringConstants';
import { flipState } from '../utils/stateUtils';
import { saveFile } from '../actions';

export class RampTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuState: CLOSE,
      text: ''
    };
    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
  }

  onMenuButtonClick() {
    this.setState({
      menuState: flipState(this.state.menuState, OPEN, CLOSE)
    });
  }

  onTextChange(newText) {
    this.setState({
      text: newText
    });
  }

  render() {
    const { menuState, text } = this.state;
    const { handleSaveFile, fileSaveState = {} } = this.props;
    return (
      <div className={styles.rampTextAreaContainer}>
        <RampMenuDrawer
          isOpen={menuState === OPEN}
          text={menuState === OPEN ? text : ''}
          onMenuItemClick={this.onMenuButtonClick}
          onSaveButtonClick={handleSaveFile}
        />
        <AppBar
          className={styles.rampAppBar}
          onLeftIconButtonTouchTap={(this.onMenuButtonClick)}
        />
        <textarea
          className={styles.rampTextArea}
          onChange={(ev) => this.onTextChange(get(ev, 'target.value'))}
        />
        <RampDialogBox saveState={fileSaveState} />
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  fileSaveState: get(state, 'fileSaveState', {})
});

export const mapDispatchToProps = dispatch => ({
  handleSaveFile: (text) => dispatch(saveFile(text))
});

RampTextArea.propTypes = {
  fileSaveState: PropTypes.object,
  handleSaveFile: PropTypes.func
};

RampTextArea.defaultProps = {
  fileSaveState: {},
  handleSaveFile: noop
};

RampTextArea.displayName = 'RampTextArea';

const RampTextAreaWrapper = connect(mapStateToProps, mapDispatchToProps)(RampTextArea);
RampTextAreaWrapper.displayName = 'RampTextAreaWrapper';
export default RampTextAreaWrapper;
