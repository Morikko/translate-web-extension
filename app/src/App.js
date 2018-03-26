import React, {Component} from 'react';
import './App.css';
import {Route, Redirect, Switch} from 'react-router-dom'
import ConfigurePanel from './Configure/ConfigurePanel';
import TranslatePanel from './Translate/TranslatePanel';
import HelpPanel from './Help/HelpPanel'
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

    this.state.doneLog = LanguageFiles.loadData(
      "doneLog"
      , {});

    this.loadJSONfromURL();

    this.getTranslatePanel = this.getTranslatePanel.bind(this);
    this.getConfigurePanel = this.getConfigurePanel.bind(this);
    this.updateTranslation = this.updateTranslation.bind(this);
    this.setDone = this.setDone.bind(this);
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
        updateTranslation={this.updateTranslation}
        updateDone={this.setDone}
        doneLog={this.state.doneLog}/>
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
    if(LanguageFiles.ids.indexOf(id) === -1) {
      return;
    }

    let file = {
      source,
      content,
    }
    this.setState({
      [id]: file,
      doneLog: {},
    });
    window.sessionStorage[id] = JSON.stringify(file);
    window.sessionStorage.doneLog = JSON.stringify({});

    if ( id === "baseTargetLanguage") {
      this.handleSetLanguageFile("headTargetLanguage", source, content)
    }
  }

  updateTranslation(id, value) {
    if ( value.length ) {
      if ( !this.state.headTargetLanguage.content[id] ) {
        // eslint-disable-next-line
        this.state.headTargetLanguage.content[id] = {...this.state.headSourceLanguage.content[id]};
      }
      // eslint-disable-next-line
      this.state.headTargetLanguage.content[id].message = value;
    } else {
      delete this.state.headTargetLanguage.content[id];
    }
    //this.forceUpdate();
    window.sessionStorage.headTargetLanguage = JSON.stringify(this.state.headTargetLanguage);
  }

  /**
   * @param {String} id - key in locales.json
   */
  setDone(id, value) {
    let nextDoneLog = Object.assign({}, this.state.doneLog);
    nextDoneLog[id] = value;

    this.setState({
      doneLog: nextDoneLog,
    }, ()=>{
      window.sessionStorage.doneLog = JSON.stringify(this.state.doneLog)
    });
  }

  downloadTranslatedFile(event) {
    let download = document.getElementById('download-final');
    let url = URL.createObjectURL(new Blob([
      JSON.stringify(this.getFullTranslation())
    ], {
      type: 'application/json'
    }));
    download.href = url;
    download.download = "messages.json";
    download.click();
    URL.revokeObjectURL(url);
  }

  getFullTranslation() {
    const translation = {};
    const source = this.state.headTargetLanguage.content;
    const target = this.state.headTargetLanguage.content;

    for (let id of Object.keys(source)) {
      if ( target[id].message.length > 0 ) {
        translation[id] = JSON.parse(JSON.stringify(source[id]));
        translation[id].message = target[id].message;
      }
    }

    return translation;
  }

  reset(event) {
    if( window.confirm("Do you want to reset the project ?") ) {
      let newState = {};
      LanguageFiles.ids.forEach((file)=>{
        newState[file] = LanguageFiles.languageFileFactory();
        window.sessionStorage.removeItem(file);
      })
      newState["doneLog"] = {};
      window.sessionStorage.removeItem("doneLog");
      this.setState(newState);
    }
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
    let d = new Date();
    download.download = "project" + "-" + d.getFullYear() + ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2) + "-" + ("0" + d.getHours()).slice(-2) + ("0" + d.getMinutes()).slice(-2) + ("0" + d.getSeconds()).slice(-2) + ".json";
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

  loadJSONfromURL(){
    let values = [
      {
        paramName: 'baseoriginal',
        id: "baseSourceLanguage"
      },
      {
        paramName: 'headoriginal',
        id: "headSourceLanguage"
      },
      {
        paramName: 'basetarget',
        id: "baseTargetLanguage"
      },
    ];

    if ( !window.location.search.length ) {
      return
    }

    for (let p of values ) {
      let param = this.getParameterByName(p.paramName);
      if (param.length) {
        LanguageFiles.loadUrl(param, (content)=>{
          this.handleSetLanguageFile(p.id, param, content);
        });
      }
    }

    if(window.location.search.length){
      window.history.pushState(
        "object or string",
        "Translate Web App",
        window.location.origin + window.location.pathname);
    }

  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    // eslint-disable-next-line
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return '';
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
}

export default App;
