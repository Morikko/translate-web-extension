import React, {Component} from 'react';
import classNames from 'classnames'
import './TranslatePanel.css'

class TranslatePanel extends Component {

  handleTextAreaChange(event) {
    let id = event.target.attributes["refid"].value;
    let value = event.target.value;

    this.props.updateTranslation(id, value);
  }

  rowFactory(id, params = {}) {
    params = Object.assign({
      original: "",
      target: "",
      description: "",
      new: false,
      delete: false,
      update: false,
      diff: false
    }, params);

    return (<div className={
      classNames({
        "update": params.update,
        "delete": params.delete,
        "new": params.new,
        "diff": params.diff,
      }, "translate-row translate-field")
    }
    key={id}>
      <div className="translate-id">{id}</div>
      <div className="translate-original">
        <p>{params.original}</p>
      </div>
      <div className="translate-target">
        <textarea refid={id} defaultValue={params.target}
            onBlur={this.handleTextAreaChange.bind(this)}
            ></textarea>
      </div>
      <div className="translate-description">{params.description}</div>
    </div>)
  }

  render() {
    let headSourceLanguage = this.props.languagesFiles["headSourceLanguage"];
    let baseSourceLanguage = this.props.languagesFiles["baseSourceLanguage"];
    let headTargetLanguage = this.props.languagesFiles["headTargetLanguage"];
    let baseTargetLanguage = this.props.languagesFiles["baseTargetLanguage"];

    let array = [];

    for (let field in headSourceLanguage) {
      let params = {
        original: "",
        target: "",
        description: "",
        new: false,
        delete: false,
        update: false,
        diff: false,
      };

      if (headSourceLanguage[field]) {
        params.original = headSourceLanguage[field].message;
        params.description = headSourceLanguage[field].description;
      }

      if (headTargetLanguage && headTargetLanguage[field]) {
        params.target = headTargetLanguage[field].message;
      }

      if (baseSourceLanguage && baseTargetLanguage && headSourceLanguage[field] && !baseSourceLanguage[field]
        && !baseTargetLanguage[field]) {
          params.new = true;
      }

      if (baseSourceLanguage && !headSourceLanguage[field] && baseSourceLanguage[field]) {
          params.delete = true;
      }

      if (baseTargetLanguage && headTargetLanguage ) {
        if ( !baseTargetLanguage[field] && headTargetLanguage[field] ) {
          params.diff = true;
        }
        if (baseTargetLanguage[field] && headTargetLanguage[field] && headTargetLanguage[field].message !== baseTargetLanguage[field].message) {
          params.diff = true;
        }
      }

      if (baseSourceLanguage && headSourceLanguage[field] &&
          baseSourceLanguage[field]
          && headSourceLanguage[field].message !== baseSourceLanguage[field].message) {
          params.update = true;
      }

      array.push(this.rowFactory(field, params));
    }

    return (<div id="translate-panel">
      <div id="translate-controls">
        Controls
      </div>
      <div id="translate-header" className="translate-row">
        <div>id</div>
        <div>Original language</div>
        <div>Target language</div>
        <div>Description</div>
      </div>
      <div id="translate-content">
        {array}
      </div>
    </div>);
  }
}

export default TranslatePanel;
