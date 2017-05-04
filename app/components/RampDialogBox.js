import React, { Component, PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import styles from '../styles/RampDialogBox.css';
import { SAVE_FILE_IN_PROGRESS, SAVE_FILE_COMPLETED, SAVE_FILE_ERRORED, OPEN, CLOSE } from '../constants/stringConstants';

export const statusToMessageMap = {
  [SAVE_FILE_IN_PROGRESS]: 'Saving file...',
  [SAVE_FILE_COMPLETED]: 'File Saved',
  [SAVE_FILE_ERRORED]: 'There was an error saving the file'
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
    if (!isEmpty(nextProps.saveState.status)
      && nextProps.saveState.status !== this.props.saveState.status) {
      this.setState({
        visibility: OPEN
      });
    }
  }

  onCloseDialog() {
    this.setState({
      visibility: CLOSE
    });
  }

  renderCloseButton() {
    return (
      <FlatButton
        label="Close"
        onTouchTap={this.onCloseDialog}
      />
    );
  }

  render() {
    const { visibility } = this.state;
    const {
      saveState: {
        status = ''
      }
    } = this.props;

    return (
      <div>
        <Dialog
          bodyClassName={styles.rampDialogBox}
          titleClassName={styles.rampDialogBoxTitle}
          open={visibility === OPEN}
          actions={[this.renderCloseButton()]}
          title={statusToMessageMap[status] || ''}
        />
      </div>
    );
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
