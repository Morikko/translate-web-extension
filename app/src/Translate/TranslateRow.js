import React, {Component} from 'react';
import classNames from 'classnames'
import './TranslateRow.css'

class TranslateRow extends Component {

  render() {
    let params = {
      original: "",
      target: "",
      description: "",
      new: false,
      delete: false,
      update: false,
      diff: false,
    };


    if (this.props.headSourceField) {
      params.original = this.props.headSourceField.message;
      params.description = this.props.headSourceField.description;
    }

    if (this.props.headTargetField) {
      params.target = this.props.headTargetField.message;
    }

    if (this.props.headSourceField && !this.props.baseSourceField
      && !this.props.baseTargetField) {
        params.new = true;
    }

    if (!this.props.headSourceField && this.props.baseSourceField) {
        params.delete = true;
    }

    if ( !this.props.baseTargetField && this.props.headTargetField ) {
      params.diff = true;
    }
    if (this.props.baseTargetField && this.props.headTargetField && this.props.headTargetField.message !== this.props.baseTargetField.message) {
      params.diff = true;
    }

    if (this.props.headSourceField &&
        this.props.baseSourceField
        && this.props.headSourceField.message !== this.props.baseSourceField.message) {
        params.update = true;
    }

    return this.rowFactory(this.props.field, params);
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
    }>
      <div className="translate-id">{id}</div>
      <div className="translate-original">
        <p>{params.original}</p>
      </div>
      <div className="translate-target" key={"div-"+id}>
        <textarea
            refid={id}
            defaultValue={params.target}
            onBlur={this.handleTextAreaChange.bind(this)}
            key={"textarea-"+id}
            ></textarea>
      </div>
      <div className="translate-description">{params.description}</div>
    </div>)
  }

  handleTextAreaChange(event) {
    let id = event.target.attributes["refid"].value;
    let value = event.target.value;

    this.props.updateTranslation(id, value);
  }
}

export default TranslateRow;
