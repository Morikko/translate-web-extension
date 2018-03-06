import React, {Component} from 'react';
import classNames from 'classnames'
import './TranslateRow.css'
//import jsdiff from 'diff'
var jsdiff = require('diff');

class TranslateRow extends Component {
  constructor(props){
    super(props);

    this.state = {
      original: 'new',
    }
  }

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
      if ( !this.props.baseSourceField) {
        params.original = this.props.headSourceField.message;
      } else {
        params.original = (
          <span>
          {
            jsdiff.diffWords(
              this.props.baseSourceField.message,
              this.props.headSourceField.message).map((part)=>{
                let color = part.added ? 'added' :
                  part.removed ? 'removed' : 'unchanged';

                return (
                  <span className={color}
                        key={Math.random()}>
                    {part.value}
                  </span>
                );
              })
          }
        </span>)
      }

      params.description = this.props.headSourceField.description;
    }

    if (this.props.headTargetField) {
      params.target = this.props.headTargetField.message;
    }

    if (this.props.headSourceField && !this.props.baseSourceField
      && !this.props.baseTargetField) {
        params.new = true;
    }

    /* IMPOSSIBLE
    if (!this.props.headSourceField && this.props.baseSourceField) {
        params.delete = true;
    }
    */

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
        "hidden": !params.update && !params.new && !params.diff,
        "update": params.update,
        "delete": params.delete,
        "new": params.new,
        "diff": params.diff,
      }, "translate-row translate-field")
    }>
      <div className="translate-id"><p>{id}</p></div>
      <div className={"translate-original "+this.state.original}>
        <p>{params.original}</p>
        {
          params.update &&
          <div className="change"
            onClick={this.changeOriginal.bind(this)}></div>
        }
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

  changeOriginal(event) {
    let newOriginal = "new";
    if ( this.state.original === "new" ) {
      newOriginal = "old";
    }
    this.setState({
      original: newOriginal
    })
  }

  handleTextAreaChange(event) {
    let id = event.target.attributes["refid"].value;
    let value = event.target.value;

    this.forceUpdate();

    this.props.updateTranslation(id, value);
  }
}

export default TranslateRow;
