import React, { Component } from 'react';
import './ConfigurePanel.css';
import ConfigureFileSection from './ConfigureFileSection';
import {Route, Link, Redirect, Switch} from 'react-router-dom'

class ConfigurePanel extends Component {
  render() {
    return (
      <div id="configure-panel">
        <ul className="tab-header">
          <li><Link to={`${this.props.match.url}/files`}>Files</Link></li>
          <li><Link to={`${this.props.match.url}/git`}>Github Repository</Link></li>
          <li><Link to={`${this.props.match.url}/project`}>Project</Link></li>
        </ul>
        <div id="configure-content">
          <Switch>
            <Route path={`${this.props.match.url}/files`} component={ConfigureFileSection}/>
            <Route path={`${this.props.match.url}/git`} component={()=><h2>Git</h2>}/>
            <Route path={`${this.props.match.url}/project`} component={()=><h2>Project</h2>}/>
            <Route component={()=><Redirect to={`${this.props.match.url}/git`} />}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default ConfigurePanel;
