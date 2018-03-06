import React, {Component} from 'react';
import TranslateRow from './TranslateRow'
import './TranslatePanel.css'

class TranslatePanel extends Component {

  render() {
    let headSourceLanguage = this.props.languagesFiles["headSourceLanguage"];
    let baseSourceLanguage = this.props.languagesFiles["baseSourceLanguage"];
    let headTargetLanguage = this.props.languagesFiles["headTargetLanguage"];
    let baseTargetLanguage = this.props.languagesFiles["baseTargetLanguage"];

    let array = [];

    for (let field in headSourceLanguage) {
      array.push(
        <TranslateRow
          field={field}
          key={field}
          headSourceField={headSourceLanguage[field]}
          headTargetField={headTargetLanguage[field]}
          baseSourceField={baseSourceLanguage[field]}
          baseTargetField={baseTargetLanguage[field]}
          updateTranslation={this.props.updateTranslation}
        />
        );
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

  componentDidMount(){
  }

  componentWillUnmount(){
  }

  componentDidUpdate(){
  }
}

export default TranslatePanel;
