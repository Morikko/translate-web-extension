import React, {Component} from 'react';
import './TranslatePanel.css'

class TranslatePanel extends Component {
  constructor(props) {
    super(props);
  }

  rowFactory(id, original="Original", target="Target", description="Description") {
    return (
    <div className="translate-row translate-field"
        key={id}>
      <div className="translate-id">{id}</div>
      <div className="translate-original"><p>{original}</p></div>
      <div className="translate-target">
          <textarea defaultValue={target}></textarea>
      </div>
      <div className="translate-description">{description}</div>
    </div>)
  }

  render() {
    let array = [];

    for (let field in this.props.languagesFiles["headSourceLanguage"]) {
      array.push(this.rowFactory(
        field,
        this.props.languagesFiles["headSourceLanguage"][field].message,
        "target",
        this.props.languagesFiles["headSourceLanguage"][field].description
      ))
    }

    return (
      <div id="translate-panel">
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
      </div>
      );
  }
}

export default TranslatePanel;
