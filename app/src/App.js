import React, {Component} from 'react';
import './App.css';
import {Route, Link, Redirect, Switch} from 'react-router-dom'
import ConfigurePanel from './ConfigurePanel/ConfigurePanel';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refLangBase: {}, // Last reference for the original language
      targetLangBase: {}, // Last translation done
      refLangUpdate: {}, // New reference for the original language
      targetLangUpdate: {}, // New translation in progress
    }
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <ul>
              <li><Link to={`${this.props.match.url}/help`}>Help</Link></li>
              <li><Link to={`${this.props.match.url}/configure`}>Configure</Link></li>
              <li><Link to={`${this.props.match.url}/translate`}>Translate</Link></li>
              <li><Link to={`${this.props.match.url}/release`}>Release</Link></li>
            </ul>
          </header>
          <div id="panel">
            <Switch>
              <Route path={`${this.props.match.url}/help`} component={()=><h2>Help</h2>}/>
              <Route path={`${this.props.match.url}/translate`} component={()=><h2>Translate</h2>}/>
              <Route path={`${this.props.match.url}/configure`} component={ConfigurePanel}/>
              <Route path={`${this.props.match.url}/release`} component={()=><h2>Release</h2>}/>
              <Route component={()=><Redirect to={`${this.props.match.url}/configure`} />}/>
            </Switch>
          </div>
        </div>
    );
  }
}

export default App;
