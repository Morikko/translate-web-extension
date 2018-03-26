import React, { Component } from 'react';
import ReactMardown from 'react-markdown';
import './HelpPanel.css';
import markdown from './Markdown.js'




class HelpPanel extends Component {
  render() {
    return (
      <div id="help-panel">
        <div id="help-content">
          <ReactMardown source={markdown} escapeHtml={false}/>
        </div>
      </div>
    )
  }

  componentDidMount(){
    // Set example URL
    window.generateUrl();
  }
}

export default HelpPanel;
