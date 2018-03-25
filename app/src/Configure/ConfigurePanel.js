import React, { Component } from 'react';
import './ConfigurePanel.css';
import ButtonFile from './ButtonFile'
import ConfigureFileSection from './ConfigureFileSection';
import LanguageFiles from '../LanguageFiles'

class ConfigurePanel extends Component {

  render() {

    let configureFileArray = [];

    for (let p in LanguageFiles.Information) {
      if ( p === "headTargetLanguage" ) {
        continue;
      }
      configureFileArray.push(
        <ConfigureFileSection
          title={LanguageFiles.Information[p].title}
          id={p}
          current={this.props.languagesFiles[p]}
          key={p}
          description={LanguageFiles.Information[p].description}
          setLanguageFile={this.props.setLanguageFile}
          />
      )
    }

    return (
      <div id="configure-panel">
        <h1>Configure</h1>
        <h2>Project</h2>
        <div style={{width: "225px"}}>
          <ButtonFile
            id="file-lang-ref"
            title="Load project from disk"
            onFileSelected={this.props.loadProject}/>
        </div>
        {
          configureFileArray
        }
      </div>
    );
  }
}

export default ConfigurePanel;
