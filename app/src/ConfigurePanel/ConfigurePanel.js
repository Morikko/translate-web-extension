import React, { Component } from 'react';
import './ConfigurePanel.css';
import ConfigureFileSection from './ConfigureFileSection';
import {Route, Link, Redirect, Switch} from 'react-router-dom'

class ConfigurePanel extends Component {
  render() {
    return (
      <div id="configure-panel">
        <ConfigureFileSection
          title="Current Original Language" id="original-lang"
          />
        <ConfigureFileSection
          title="Previous Target Language" id="original-lang"
          optional/>
        <ConfigureFileSection
          title="Previous Original Language" id="original-lang"
          optional/>
      </div>
    );
  }
}

export default ConfigurePanel;
