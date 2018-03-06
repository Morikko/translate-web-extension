import React, {Component} from 'react';
import './App.css';
import {Route, Redirect, Switch} from 'react-router-dom'
import ConfigurePanel from './Configure/ConfigurePanel';
import TranslatePanel from './Translate/TranslatePanel';
import HelpPanel from './HelpPanel'
import LanguageFiles from './LanguageFiles'
import AppNavBar from './NavBar'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    for (let p of LanguageFiles.ids) {
      this.state[p] = LanguageFiles.loadData(
        p
        , LanguageFiles.languageFileFactory());
    }

    this.getTranslatePanel = this.getTranslatePanel.bind(this);
    this.getConfigurePanel = this.getConfigurePanel.bind(this);
    this.updateTranslation = this.updateTranslation.bind(this);
    this.loadApp = this.loadApp.bind(this);
    this.handleSetLanguageFile = this.handleSetLanguageFile.bind(this);
  }

  render() {
    return (
        <div className="App">
          <AppNavBar {...this.props}
              onRelease={this.downloadTranslatedFile.bind(this)}
              onReset={this.reset.bind(this)}
              onSave={this.exportApp.bind(this)}/>

          <div style={{position: "relative", flex: 1}}>
          <div id="panel">
            <Switch>
              <Route path={`${this.props.match.url}/help`}
                      render={()=> <HelpPanel/>} />
              <Route path={`${this.props.match.url}/translate`}
                      render={()=>this.getTranslatePanel()}/>
              <Route path={`${this.props.match.url}/configure`}
                      render={(props)=>this.getConfigurePanel(props)}/>
              <Route path={`${this.props.match.url}/release`}
                      render={()=><h2>Release</h2>}/>
              <Route component={()=><Redirect
                      to={`${this.props.match.url}/configure`} />}/>
            </Switch>
          </div>
        </div>
        <a href="" download id="download-final" hidden>Get translated file</a>
        </div>
    );
  }

  getTranslatePanel() {
    let languagesFiles = {};
    for (let p of LanguageFiles.ids) {
      languagesFiles[p] = this.state[p].content;
    }
      return <TranslatePanel
                languagesFiles={languagesFiles}
                updateTranslation={this.updateTranslation}/>
  }

  getConfigurePanel(props) {
    let languagesFiles = {};
    for (let p of LanguageFiles.ids) {
      languagesFiles[p] = this.state[p].source;
    }

    return <ConfigurePanel
              loadProject={this.loadApp}
              languagesFiles={languagesFiles}
              setLanguageFile={this.handleSetLanguageFile}/>
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
    LanguageFiles.ids.forEach((file)=>{
      newState[file] = LanguageFiles.languageFileFactory();
      window.sessionStorage.removeItem(file);
    })
    this.setState(newState);
  }

  exportApp(event) {
    let download = document.getElementById('download-final');
    let url = URL.createObjectURL(new Blob([
      JSON.stringify({
        name: "translate-web-extension",
        appstate: this.state,
      })
    ], {
      type: 'application/json'
    }));
    download.href = url;
    download.download = "project.json";
    download.click();
    URL.revokeObjectURL(url);
  }

  loadApp(content) {
    if ( content.name === "translate-web-extension") {
      if ( content.appstate ) {
        this.setState(content.appstate);
        for (let p in content.appstate) {
          window.sessionStorage[p] = JSON.stringify(content.appstate[p]);
        }
      } else {
        console.log("Wrong JSON file: No App to load.")
      }
    } else {
      console.log("Wrong JSON file: It is not a project.")
    }
  }
}

export default App;
