import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

import RampMenuDrawer from './RampMenuDrawer';

import styles from '../styles/RampTextArea.css';
import { OPEN, CLOSE } from '../constants/constants';
import { flipState } from '../utils/stateUtils';

class RampTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuState: CLOSE
    };
    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
  }

  onMenuButtonClick() {
    this.setState({
      menuState: flipState(this.state.menuState, OPEN, CLOSE)
    });
  }

  render() {
    return (
      <div className={styles.rampTextAreaContainer}>
        <RampMenuDrawer
          isOpen={this.state.menuState === OPEN}
          onMenuItemClick={this.onMenuButtonClick}
        />
        <AppBar
          className={styles.rampAppBar}
          onLeftIconButtonTouchTap={(this.onMenuButtonClick)}
        />
        <textarea className={styles.rampTextArea} />
      </div>
    );
  }
}

export default RampTextArea;
