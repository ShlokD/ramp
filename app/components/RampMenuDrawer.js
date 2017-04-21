import React, { Component, PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import noop from 'lodash/noop';

class RampMenuDrawer extends Component {
  render() {
    const { isOpen, onMenuItemClick } = this.props;
    return (
      <Drawer
        open={isOpen}
        width={300}
      >
        <MenuItem onTouchTap={onMenuItemClick}> Close </MenuItem>
      </Drawer>);
  }
}

RampMenuDrawer.propTypes = {
  isOpen: PropTypes.bool,
  onMenuItemClick: PropTypes.func
};

RampMenuDrawer.defaultProps = {
  isOpen: false,
  onMenuItemClick: noop
};

export default RampMenuDrawer;
