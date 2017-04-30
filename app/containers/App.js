// @flow
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { RampTextArea } from '../components/RampTextArea';

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <RampTextArea />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
