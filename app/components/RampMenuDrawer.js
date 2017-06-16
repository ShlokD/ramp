import React, { Component, PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import noop from 'lodash/noop';
import map from 'lodash/map';
import Divider from 'material-ui/Divider';
import ContentClear from 'material-ui/svg-icons/content/clear';
import Done from 'material-ui/svg-icons/action/done';
import fecha from 'fecha';
import styles from '../styles/RampMenuDrawer.css';
import { wordCounter, uniqueWordCounter, mostFrequentWords } from '../utils/textUtils';

class RampMenuDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsWritten: 0,
      uniqueWords: 0,
      sessionDuration: 0,
      mostFrequentWords: []
    };

    this.onSave = this.onSave.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillReceiveProps(props) {
    const { text } = props;
    this.setState({
      wordsWritten: wordCounter(text),
      uniqueWords: uniqueWordCounter(text),
      mostFrequentWords: mostFrequentWords(text)
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.setState({
      sessionDuration: new Date() - this.props.begin
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
            <div className={styles.rampWordStatsTitle}>Session Duration </div>
            <div className={styles.rampSessionDuration}>{fecha.format(this.state.sessionDuration, 'mm:ss')}</div>
            <div className={styles.rampWordStatsTitle}>Top Words </div>
            {map(this.state.mostFrequentWords,
              (frequentWord, key) => (<div key={key} className={styles.rampWordFrequencies}>
                {frequentWord.word}, {frequentWord.wordCount}
              </div>))}
          </div>
        </MenuItem>
      </Drawer>);
  }
}

RampMenuDrawer.propTypes = {
  isOpen: PropTypes.bool,
  text: PropTypes.string,
  onMenuItemClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
  begin: PropTypes.number
};

RampMenuDrawer.defaultProps = {
  isOpen: false,
  text: '',
  onMenuItemClick: noop,
  onSaveButtonClick: noop,
  begin: Date.now()
};

export default RampMenuDrawer;
