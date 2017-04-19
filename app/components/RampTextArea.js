import React, { Component } from 'react';
import styles from '../styles/RampTextArea.css';

class RampTextArea extends Component {
  render() {
    return (
      <div>
        <textarea className={styles.rampTextArea} rows={50} cols={50} />
      </div>
    );
  }
}

export default RampTextArea;
