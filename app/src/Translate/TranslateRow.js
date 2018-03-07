import React, {Component} from 'react';
import classNames from 'classnames'
import './TranslateRow.css'
var jsdiff = require('diff');

class TranslateRow extends Component {
  constructor(props){
    super(props);

    this.state = {
      originalView: 'new',
    }

    Object.assign(this.state, this.getFieldValues(props));
    Object.assign(this.state, this.getFieldStates(props));
  }

  componentWillReceiveProps(nextProps) {
    let nextState = Object.assign({}, this.state);

    Object.assign(nextState, this.getFieldValues(nextProps));
    Object.assign(nextState, this.getFieldStates(nextProps));

    this.setState(nextState);
  }

  getFieldValues(props) {
    return  {
      original: props.headSourceField.message,
      target: (props.headTargetField && props.headTargetField.message)  ||"",
      description: props.headSourceField.description||"",
    }
  }

  getFieldStates(props){
    let fieldStates = {
      new: false,
      update: false,
      diff: false,
      todo: false,
      unchanged: false,
      missing: false,
      done: false,
      hidden: true,
    }

    if (props.headSourceField && !props.baseSourceField
      && !props.baseTargetField) {
        fieldStates.new = true;
    }

    if ( !props.baseTargetField && props.headTargetField ) {
      fieldStates.diff = true;
    }
    if (props.baseTargetField && props.headTargetField && this.state.target !== props.baseTargetField.message) {
      fieldStates.diff = true;
    }

    if ( this.state.target.length===0 ) {
      fieldStates.missing = true;
    }

    if (props.headSourceField &&
        props.baseSourceField
        && props.headSourceField.message !== props.baseSourceField.message) {
        fieldStates.update = true;
    }


    if ( !fieldStates.new && !fieldStates.update
            && !fieldStates.diff  && !this.state.missing) {
      fieldStates.unchanged = true;
    } else {
        if ( false ) {
          fieldStates.done = true;
        } else {
          fieldStates.todo = true;
        }
    }

    if ( (fieldStates.unchanged && props.visible.unchanged)
          || (fieldStates.todo && props.visible.todo)
          || (fieldStates.done && props.visible.done) ) {
      fieldStates.hidden = false;
    }

    if ( props.filter.length ) {
      if ( this.isPartOfFilter(props) ) {
        fieldStates.hidden = true;
      }
    }

    return fieldStates;
  }

  isPartOfFilter(props) {
    return ( !props.field.includes(props.filter)
                && !this.state.original.includes(props.filter)
                && !this.state.target.includes(props.filter)
                && !this.state.description.includes(props.filter));
  }

  render() {
    return (
      <div
          className={ classNames({
            "hidden": this.state.hidden,
            "update": this.state.update,
            "delete": this.state.delete,
            "new": this.state.new,
            "diff": this.state.diff,
            "missing": this.state.missing,
          }, "translate-row translate-field")}>
        {this.getIdField()}
        {this.getOriginalField()}
        {this.getTargetField()}
        {this.getDescriptionField()}
      </div>
    );
  }

  getDescriptionField() {
    return (
      <div className={classNames({
        "translate-description": true,
        "hidden": this.state.description.length===0
      })}>
      {this.state.description}
      </div>
    );
  }

  getTargetField() {
    let id = this.props.field;
    return (
      <div className="translate-target" key={"div-"+id}>
        <textarea
            refid={id}
            defaultValue={this.state.target}
            onBlur={this.handleTextAreaChange.bind(this)}
            key={"textarea-"+id}
            ></textarea>
      </div>
    );
  }

  getOriginalField() {

    let originalText;

    if ( this.state.update ) {
      originalText = (
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
        </span>
      );
    } else {
      originalText = this.props.headSourceField.message;
    }

    return (
      <div className={"translate-original "+this.state.originalView}>
        <p>{originalText}</p>
        {
          this.state.update &&
          <div className="change"
            onClick={this.changeOriginal.bind(this)}></div>
        }
      </div>
    );
  }

  getIdField() {
    let id = this.props.field;
    return (
      <div className="translate-id">
      <p>{id}</p>
      {/*
      <div className="dropup open">
        <span>
          Done
        </span>
        <button
          style={{
            "padding": "3px"
          }}
          aria-label="Done" id="split-button-dropup" role="button" aria-haspopup="true" aria-expanded="true" type="button" class="dropdown-toggle btn btn-default"> <span class="caret"></span></button>
      </div>
      */}
    </div>
  );
  }


  changeOriginal(event) {
    let newOriginal = "new";
    if ( this.state.originalView === "new" ) {
      newOriginal = "old";
    }
    this.setState({
      original: newOriginal
    })
  }

  handleTextAreaChange(event) {
    let id = event.target.attributes["refid"].value;
    let value = event.target.value;

    this.setState({
      target: value,
    }, () => {
      this.setState(
        Object.assign(
          Object.assign({}, this.state)
          , this.getFieldStates(this.props))
      );
    });

    this.props.updateTranslation(id, value);
  }
}

export default TranslateRow;
