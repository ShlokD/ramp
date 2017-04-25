import React, { Component, PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import noop from 'lodash/noop';
import Divider from 'material-ui/Divider';
import ContentClear from 'material-ui/svg-icons/content/clear';
import Done from 'material-ui/svg-icons/action/done';
import styles from '../styles/RampMenuDrawer.css';
import { wordCounter, uniqueWordCounter } from '../utils/textUtils';

class RampMenuDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsWritten: 0,
      uniqueWords: 0
    };

    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(props) {
    const { text } = props;
    this.setState({
      wordsWritten: wordCounter(text),
      uniqueWords: uniqueWordCounter(text)
    });
  }

  onSave() {
    const { text, onSaveButtonClick } = this.props;
    onSaveButtonClick(text);
  }

  render() {
    const { isOpen, onMenuItemClick } = this.props;
    return (
      <Drawer
        open={isOpen}
        width={300}
      >
        <MenuItem
          leftIcon={<ContentClear />}
          primaryText="Close"
          onTouchTap={onMenuItemClick}
        />
        <MenuItem
          leftIcon={<Done />}
          primaryText="Save"
          onTouchTap={this.onSave}
        />
        <Divider />
        <MenuItem>
          <div className={styles.rampWordStatsContainer}>
            <div className={styles.rampWordStatsTitle}>Words Written</div>
            <div className={styles.rampWordsWritten}>{this.state.wordsWritten}</div>
            <Divider />
            <div className={styles.rampWordStatsTitle}>Unique Words </div>
            <div className={styles.rampUniqueWords}>{this.state.uniqueWords}</div>
          </div>
        </MenuItem>
      </Drawer>);
  }
}

RampMenuDrawer.propTypes = {
  isOpen: PropTypes.bool,
  text: PropTypes.string,
  onMenuItemClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func
};

RampMenuDrawer.defaultProps = {
  isOpen: false,
  text: '',
  onMenuItemClick: noop,
  onSaveButtonClick: noop
};

export default RampMenuDrawer;
