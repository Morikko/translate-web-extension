import React, {Component} from 'react';
import './App.css';
import {Route, Link, Redirect, Switch} from 'react-router-dom'
import ConfigurePanel from './ConfigurePanel/ConfigurePanel';
import TranslatePanel from './Translate/TranslatePanel';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    for (let p of App.languagesFiles) {
      this.state[p] = this.loadData(p, App.languageFileFactory());
    }
  }

  static languagesFiles = [
    "headSourceLanguage", // Current original language to translate
    "baseSourceLanguage", // Last original language translated
    "baseTargetLanguage", // Last Translation done
    "headTargetLanguage", // New translation in progress
  ]

  static languageFileFactory() {
    return {
      source:'',
      content: '',
    };
  }

  loadData(name, defaultData) {
    try {
      if (window.sessionStorage[name]) {
        return JSON.parse(window.sessionStorage[name]);
      }
      return defaultData;
    } catch(e) {
      console.error("App.loadData: " + e);
      return defaultData;
    }
  }

  render() {
    return (
        <div className="App" style={{maxHeight: window.innerHeight}}>
          <header className="App-header">
            <ul>
              <li><Link to={`${this.props.match.url}/help`}>Help</Link></li>
              <li><Link to={`${this.props.match.url}/configure`}>Configure</Link></li>
              <li><Link to={`${this.props.match.url}/translate`}>Translate</Link></li>
              <li><Link to={`${this.props.match.url}/release`}>Release</Link></li>
            </ul>
          </header>
          <div style={{position: "relative", flex: 1}}>
          <div id="panel">
            <Switch>
              <Route path={`${this.props.match.url}/help`} component={()=><h2>Help</h2>}/>
              <Route path={`${this.props.match.url}/translate`}
                component={(props)=> {
                  let languagesFiles = {};
                  for (let p of App.languagesFiles) {
                    languagesFiles[p] = this.state[p].content;
                  }
                    return <TranslatePanel
                              languagesFiles={languagesFiles} />
                }}/>
              <Route path={`${this.props.match.url}/configure`}
                render={(props) => {
                  let languagesFiles = {};
                  for (let p of App.languagesFiles) {
                    languagesFiles[p] = this.state[p].source;
                  }

                  return <ConfigurePanel
                            languagesFiles={languagesFiles}
                            setLanguageFile={this.handleSetLanguageFile.bind(this)}/>
                }}/>
              <Route path={`${this.props.match.url}/release`} component={()=><h2>Release</h2>}/>
              <Route component={()=><Redirect to={`${this.props.match.url}/configure`} />}/>
            </Switch>
          </div>
        </div>
        </div>
    );
  }

  handleSetLanguageFile(id, source, content) {
    let file = {
      source,
      content,
    }
    this.setState({
      [id]: file,
    });
    window.sessionStorage[id] = JSON.stringify(file);
  }
}

export default App;
