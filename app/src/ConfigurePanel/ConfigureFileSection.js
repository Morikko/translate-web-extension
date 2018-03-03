import React, { Component } from 'react';
import './ConfigureFileSection.css';

class ConfigureFileSection extends Component {
  render() {
    return (
      <div className="file-section">
        <input type="file" value="Lang ref" />
        <input type="file" value="Lang ref" />
        <input type="file" value="Lang ref" />
        <input type="file" value="Lang ref" />
        <input type="text" />
      </div>
    );
  }
}

export default ConfigureFileSection;
