import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import get from 'lodash/get';
import noop from 'lodash/noop';

import AppBar from 'material-ui/AppBar';
import RampMenuDrawer from './RampMenuDrawer';
import styles from '../styles/RampTextArea.css';
import { OPEN, CLOSE } from '../constants/stringConstants';
import { flipState } from '../utils/stateUtils';
import { saveFile } from '../actions/fileActions';

class RampTextArea extends Component {
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
    const { handleSaveFile } = this.props;
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
      </div>
    );
  }
}

export const mapStateToProps = state => state;

export const mapDispatchToProps = (dispatch) => ({
  handleSaveFile: (text) => dispatch(saveFile(text))
});

RampTextArea.propTypes = {
  handleSaveFile: PropTypes.func
};

RampTextArea.defaultProps = {
  handleSaveFile: noop
};

export default connect(mapStateToProps, mapDispatchToProps)(RampTextArea);
