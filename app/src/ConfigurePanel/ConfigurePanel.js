import React, { Component } from 'react';
import './ConfigurePanel.css';
import ConfigureFileSection from './ConfigureFileSection';

class ConfigurePanel extends Component {

  render() {

    let configureFileArray = [];

    for (let p in this.props.languagesFiles) {
      configureFileArray.push(
        <ConfigureFileSection
          title={p} id={p}
          current={this.props.languagesFiles[p]} key={p}
          setLanguageFile={this.props.setLanguageFile}
          />
      )
    }

    return (
      <div id="configure-panel">
        {
          configureFileArray
        }
      </div>
    );
  }
}

export default ConfigurePanel;
