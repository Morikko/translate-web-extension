import React, { Component } from 'react';
import OptionSelect from './OptionSelect';
import ButtonFile from './ButtonFile';
import LanguageFiles from '../LanguageFiles'
import './ConfigureFileSection.css';


class ConfigureFileSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ConfigureFileSection.TYPE.GIT,
      url: "",
      error: "",
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
       <input
          type="button"
          className="fetch-button"
          value="Fetch"
          onClick={this.onURLFetch.bind(this)}/>
     </span>);

    let typeSection;
    switch(this.state.type){
      case ConfigureFileSection.TYPE.GIT:
        typeSection = gitSection;
           break;
        default:
        typeSection = fileSection;
    }

    let current;
    if (this.props.current.includes('https://') ){
      current = (<a href={this.props.current}>{this.props.current}</a>);
    } else {
      current = this.props.current;
    }

    let errorField;
    if ( this.state.error.length ) {
      errorField = (
        <div>
          Error: {this.state.error}
        </div>
      )
    }
    let description;
    if (this.props.description.length){
      description = (
        <ul>
          {
            this.props.description.map((line, index)=>{
              return (<li key={this.props.id+"-line-"+index}>
                        {line}
                      </li>);
              })
          }
        </ul>
      )
    }

    return (
      <div className="file-section">
        <h2>{this.props.title}</h2>
        {this.props.optional && "[Optional]"}
        {description}
        <div>
          <span>Current: {current}</span>
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
      {errorField}
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
    this.props.setLanguageFile(this.props.id, "File", content);
  }

  onURLFetch(event) {
    LanguageFiles.loadUrl(
      this.state.url
      , (content)=>{
        this.setState({error: ""});
        this.props.setLanguageFile(this.props.id, this.state.url, content);
      }
      , (error) => {
        this.setState({error: error});
      }
    );
  }
}

ConfigureFileSection.TYPE = Object.freeze({
  GIT: 0,
  FILE: 1,
});

export default ConfigureFileSection;
