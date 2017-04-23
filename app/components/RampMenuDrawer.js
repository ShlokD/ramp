import React, { Component, PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import noop from 'lodash/noop';
import Divider from 'material-ui/Divider';
import ContentClear from 'material-ui/svg-icons/content/clear';
import styles from '../styles/RampMenuDrawer.css';
import { wordCounter } from '../utils/textUtils';

class RampMenuDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsWritten: 0
    };
  }

  componentWillReceiveProps(props) {
    const { text } = props;
    this.setState({
      wordsWritten: wordCounter(text)
    });
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
        <Divider />
        <MenuItem>
          <div className={styles.rampWordStatsContainer}>
            <div className={styles.rampWordStatsTitle}>Words Written</div>
            <div className={styles.rampWordsWritten}>{this.state.wordsWritten}</div>
          </div>
        </MenuItem>
      </Drawer>);
  }
}

RampMenuDrawer.propTypes = {
  isOpen: PropTypes.bool,
  text: PropTypes.string,
  onMenuItemClick: PropTypes.func
};

RampMenuDrawer.defaultProps = {
  isOpen: false,
  text: '',
  onMenuItemClick: noop
};

export default RampMenuDrawer;
