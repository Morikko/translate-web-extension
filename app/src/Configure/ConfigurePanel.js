import React, { Component } from 'react';
import './ConfigurePanel.css';
import ConfigureFileSection from './ConfigureFileSection';
import LanguageFiles from '../LanguageFiles'

class ConfigurePanel extends Component {

  render() {

    let configureFileArray = [];

    for (let p in LanguageFiles.Information) {
      configureFileArray.push(
        <ConfigureFileSection
          title={LanguageFiles.Information[p].title}
          id={p}
          current={this.props.languagesFiles[p]}
          key={p}
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
