import React, {Component} from 'react';
import './App.css';
import {Route, Link, Redirect, Switch} from 'react-router-dom'
import ConfigurePanel from './Configure/ConfigurePanel';
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
      content: {},
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
              <li><Link
                  to={`${this.props.match.url}/help`}>Help</Link></li>
              <li><Link
                  to={`${this.props.match.url}/configure`}>Configure</Link></li>
              <li><Link
                  to={`${this.props.match.url}/translate`}>Translate</Link></li>
              <li style={{cursor: "pointer"}}
                  onClick={this.downloadTranslatedFile.bind(this)}>Release</li>
              <li style={{cursor: "pointer"}}
                  onClick={this.reset.bind(this)}>Reset</li>
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
                              languagesFiles={languagesFiles}
                              updateTranslation={this.updateTranslation.bind(this)}/>
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
        <a href="" download id="download-final" hidden></a>
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

  updateTranslation(id, value) {
    if ( value.length ) {
      if ( !this.state.headTargetLanguage.content[id] ) {
        this.state.headTargetLanguage.content[id] = {...this.state.headSourceLanguage.content[id]};
      }
      this.state.headTargetLanguage.content[id].message = value;
    } else {
      delete this.state.headTargetLanguage.content[id];
    }
    //this.forceUpdate();
    window.sessionStorage.headTargetLanguage = JSON.stringify(this.state.headTargetLanguage);
  }

  downloadTranslatedFile(event) {
    let download = document.getElementById('download-final');
    let url = URL.createObjectURL(new Blob([
      JSON.stringify(this.state.headTargetLanguage.content)
    ], {
      type: 'application/json'
    }));
    download.href = url;
    download.download = "messages.json";
    download.click();
    URL.revokeObjectURL(url);
  }

  reset(event) {
    let newState = {};
    App.languagesFiles.map((file)=>{
      newState[file] = App.languageFileFactory();
      window.sessionStorage.removeItem(file);
    })
    this.setState(newState);
  }
}

export default App;
