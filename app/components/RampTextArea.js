import React, { Component } from 'react';
import get from 'lodash/get';

import AppBar from 'material-ui/AppBar';


import RampMenuDrawer from './RampMenuDrawer';

import styles from '../styles/RampTextArea.css';
import { OPEN, CLOSE } from '../constants/stringConstants';
import { flipState } from '../utils/stateUtils';

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
    return (
      <div className={styles.rampTextAreaContainer}>
        <RampMenuDrawer
          isOpen={menuState === OPEN}
          text={menuState === OPEN ? text : ''}
          onMenuItemClick={this.onMenuButtonClick}
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

export default RampTextArea;
