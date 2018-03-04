import React, {Component} from 'react';
import './TranslatePanel.css'

class TranslatePanel extends Component {
  constructor(props) {
    super(props);
  }

  rowFactory() {
    return (
    <tr className="translate-row">
      <td>Id: {Math.round(Math.random() * 999999)}</td>
      <td><textarea>Original</textarea></td>
      <td><textarea>Target</textarea></td>
      <td>Description</td>
    </tr>)
  }

  render() {
    let array = [];
    for (let i = 0; i < 12; i++) {
      array.push(this.rowFactory())
    }

    return (<div id="translate-panel">
      <div id="translate-controls">
        Controls
      </div>
      <table id="translate-content">
        <tr id="translate-header" className="translate-row">
          <th>id</th>
          <th>Original language</th>
          <th>Target language</th>
          <th>Description</th>
        </tr>
        {array}
      </table>
      </div>
      );
  }
}

export default TranslatePanel;
