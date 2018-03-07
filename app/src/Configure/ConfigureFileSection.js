import React, { Component } from 'react';
import OptionSelect from './OptionSelect';
import ButtonFile from './ButtonFile';
import './ConfigureFileSection.css';


class ConfigureFileSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ConfigureFileSection.TYPE.GIT,
      url: "",
    };
  }

  render() {

  let fileSection = (
      <span >
       <ButtonFile
         id="file-lang-ref"
         title="Import file from disk"
         onFileSelected={this.onFileChange.bind(this)}/>
      </span>),
     gitSection = (<span className="git-section">
       <input type="text" className="input-git-url"
         value={this.state.url}
         placeholder="Locales file URL..."
         onBlur={this.onChangeURL.bind(this)}
         onInput={this.onChangeURL.bind(this)}/>
       <input type="button" value="Fetch" onClick={this.onURLFetch.bind(this)}/>
     </span>);

    let typeSection;
    switch(this.state.type){
      case ConfigureFileSection.TYPE.GIT:
        typeSection = gitSection;
           break;
        default:
        typeSection = fileSection;
    }

    return (
      <div className="file-section">
        <h2>{this.props.title}</h2>
        {this.props.optional && "[Optional]"}
        <div>
          {"Current: " + this.props.current}
        </div>

        <div>
          <OptionSelect style={{display:"inline"}}
            id="type-lang-ref"
            onValueChange={this.onTypeChange.bind(this)}
            value="Type"
            selected={this.state.type}
            choices={[
              {value: ConfigureFileSection.TYPE.FILE, label:"File"},
              {value: ConfigureFileSection.TYPE.GIT, label:"Git"}
            ]}
            />
           <div>
             {typeSection}
           </div>

        </div>
      </div>
    );
  }

  onTypeChange(id, value) {
    this.setState({
      type: value,
    });
  }

  onChangeURL(event) {
    this.setState({
      url: event.target.value,
    });
  }

  onFileChange(content) {
    console.log(content);

    this.props.setLanguageFile(this.props.id, "File", content);
  }

  onURLFetch(event) {
    console.log(this.state.url);

    if ( this.state.url.startsWith("https://github.com")
          && this.state.url.endsWith(".json")) {
      let url = this.state.url
            .replace("https://github.com", "https://raw.githubusercontent.com")
            .replace("blob/", "");

      fetch(url,{ method: 'GET', mode: 'cors'})
        .then((response)=>{
          return response.json()
          })
        .then((content)=>{
          this.props.setLanguageFile(this.props.id, this.state.url, content);
        });
    }
  }
}

ConfigureFileSection.TYPE = Object.freeze({
  GIT: 0,
  FILE: 1,
});

export default ConfigureFileSection;
