import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

import styles from '../styles/RampTextArea.css';

class RampTextArea extends Component {
  render() {
    return (
      <div className={styles.rampTextAreaContainer}>
        <AppBar
          className={styles.rampAppBar}
        />
        <textarea className={styles.rampTextArea} />
      </div>
    );
  }
}

export default RampTextArea;
