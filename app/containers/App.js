// @flow
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RampTextAreaWrapper from '../components/RampTextArea';

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <RampTextAreaWrapper />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
