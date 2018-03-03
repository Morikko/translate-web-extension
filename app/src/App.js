import React, {Component} from 'react';
import './App.css';
import {Route, Link} from 'react-router-dom'

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
            <Route exact path={`${this.props.match.url}/`} component={()=><h2>Home</h2>}/>
            <Route path={`${this.props.match.url}/help`} component={()=><h2>Help</h2>}/>
            <Route path={`${this.props.match.url}/translate`} component={()=><h2>Translate</h2>}/>
            <Route path={`${this.props.match.url}/configure`} component={()=><h2>Configure</h2>}/>
            <Route path={`${this.props.match.url}/release`} component={()=><h2>Release</h2>}/>
          </div>
        </div>
    );
  }
}

export default App;
