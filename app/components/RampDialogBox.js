import React, { Component, PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import styles from '../styles/RampDialogBox.css';
import { SAVE_FILE_IN_PROGRESS, SAVE_FILE_COMPLETED, SAVE_FILE_ERRORED, OPEN, CLOSE } from '../constants/stringConstants';

const statusToMessageMap = {
  [SAVE_FILE_IN_PROGRESS]: 'Saving file...',
  [SAVE_FILE_COMPLETED]: 'File Saved',
  [SAVE_FILE_ERRORED]: 'There was an error saving the files'
};

class RampDialogBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: CLOSE
    };

    this.onCloseDialog = this.onCloseDialog.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.saveState.status)) {
      this.setState({
        visibility: OPEN
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.saveState.status !== this.props.saveState.status;
  }


  onCloseDialog() {
    this.setState({
      visibility: CLOSE
    });
  }

  render() {
    const { visibility } = this.state;
    const {
      saveState: {
        status = ''
      }
    } = this.props;

    return visibility === OPEN ? (
      <div className={styles.rampDialogBoxContainer}>
        <div className={styles.rampDialogBoxMessage}>
          {statusToMessageMap[status]}
        </div>
        <button className={styles.rampDialogBoxClose} onClick={this.onCloseDialog}>
          X
        </button>
      </div>
    ) : null;
  }
}

RampDialogBox.propTypes = {
  saveState: PropTypes.shape({
    status: PropTypes.oneOf([SAVE_FILE_IN_PROGRESS, SAVE_FILE_COMPLETED, SAVE_FILE_ERRORED, ''])
  })
};

RampDialogBox.defaultProps = {
  saveState: {
    status: 'Something'
  }
};


export default RampDialogBox;
