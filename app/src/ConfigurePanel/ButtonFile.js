import React, { Component } from 'react';
import './ButtonFile.css'

class ButtonFile extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (<div className="button-file">
      <input
        className="button-file-input"
        id={this.props.id}
        type="file"
        onChange={this.handleClick}
        tabIndex="-1"
      />
      <label
          className="button-file-label"
          htmlFor={this.props.id}
          tabIndex="0">
        {this.props.title}
      </label>
    </div>);
  }

  async readJsonFile(file) {
    return new Promise((resolve, reject) => {
      let file_reader = new FileReader();
      file_reader.addEventListener('loadend', function(event) {
        try {
          resolve(JSON.parse(event.target.result));
        } catch (e) {
          reject("Impossible to read file: " + e);
        }
      });
      file_reader.addEventListener('error', function(error) {
        reject("Error when reading file: " + error);
      });
      file_reader.readAsText(file, 'utf-8');
    });
  }

  async handleClick(event) {
    event.stopPropagation();
    try {
      let files = event.target.files;
      if (files.length === 0) {
        return "No file selected..."
      }
      const jsonContent = await this.readJsonFile(files[0]);
      this.props.onFileSelected(jsonContent);
    } catch (e) {
      let msg = "ButtonFile.handleClick failed: " + e;
      console.error(msg);
      return msg;
    }
  }
};

export default ButtonFile;
/*
ButtonFile.propTypes = {
  title: PropTypes.string,
  onFileSelected: PropTypes.func,
  id: PropTypes.string,
};
*/
