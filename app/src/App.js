import React, {Component} from 'react';
import './App.css';
import {Route, Redirect, Switch} from 'react-router-dom'
import ConfigurePanel from './Configure/ConfigurePanel';
import TranslatePanel from './Translate/TranslatePanel';
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
  }

  render() {
    return (
        <div className="App" style={{maxHeight: window.innerHeight}}>
          <AppNavBar {...this.props}/>
          <div style={{position: "relative", flex: 1}}>
          <div id="panel">
            <Switch>
              <Route path={`${this.props.match.url}/help`}
                      component={()=><h2>Help</h2>}/>
              <Route path={`${this.props.match.url}/translate`}
                      render={this.getTranslatePanel.bind(this)}/>
              <Route path={`${this.props.match.url}/configure`}
                      render={this.getConfigurePanel.bind(this)}/>
              <Route path={`${this.props.match.url}/release`}
                      component={()=><h2>Release</h2>}/>
              <Route component={()=><Redirect to={`${this.props.match.url}/configure`} />}/>
            </Switch>
          </div>
        </div>
        <a href="" download id="download-final" hidden>Get translated file</a>
        </div>
    );
  }

  getTranslatePanel(props) {
    let languagesFiles = {};
    for (let p of LanguageFiles.ids) {
      languagesFiles[p] = this.state[p].content;
    }
      return <TranslatePanel
                languagesFiles={languagesFiles}
                updateTranslation={this.updateTranslation.bind(this)}/>
  }

  getConfigurePanel(props) {
    let languagesFiles = {};
    for (let p of LanguageFiles.ids) {
      languagesFiles[p] = this.state[p].source;
    }

    return <ConfigurePanel
              languagesFiles={languagesFiles}
              setLanguageFile={this.handleSetLanguageFile.bind(this)}/>
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
    App.ids.forEach((file)=>{
      newState[file] = LanguageFiles.languageFileFactory();
      window.sessionStorage.removeItem(file);
    })
    this.setState(newState);
  }
}

export default App;
