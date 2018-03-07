import React, {Component} from 'react';
import classNames from 'classnames'
import './TranslateRow.css'
var jsdiff = require('diff');

class TranslateRow extends Component {
  constructor(props){
    super(props);

    this.state = {
      originalView: 'new',
      showExtraActions: false,
    }

    Object.assign(this.state, this.getFieldValues(props));
    Object.assign(this.state, this.getFieldStates(props));

    this.resetTargetField = this.resetTargetField.bind(this);
    this.changeOriginal = this.changeOriginal.bind(this);
    this.setDone = this.setDone.bind(this);
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

    if ( !props.baseTargetField && this.state.target.length ) {
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
            && !fieldStates.diff  && !fieldStates.missing) {
      fieldStates.unchanged = true;
    } else {
        if ( props.isDone ) {
          fieldStates.done = true;
          fieldStates.todo = false;
        } else {
          fieldStates.todo = true;
          fieldStates.done = false;
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
            "unchanged": this.state.unchanged,
            "todo": this.state.todo,
            "done": this.state.done,
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
            value={this.state.target}
            onChange={this.handleTextAreaChange.bind(this)}
            onBlur={this.handleTextAreaChange.bind(this)}
            key={"textarea-"+id}
            tabIndex={this.props.index}
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
      </div>
    );
  }

  getIdField() {
    let id = this.props.field;

    let getButtonTitle = function(){
      if(this.state.unchanged) {
        return "Unchanged";
      }
      if(this.state.todo) {
        return "To Do";
      }
      if(this.state.done) {
        return "Done";
      }
    }.bind(this)

    let extraActions = (
      <div className={classNames({
        "dropup": true,
         "open": this.state.showExtraActions,
      })}>
        <div className={classNames({
          "actions": true,
          "hidden": !this.state.showExtraActions,
        })}>
          {
            this.state.diff
              && <div onClick={this.resetTargetField}>Reset</div>
          }
          {
            this.state.update
              && <div onClick={this.changeOriginal}>Old/New</div>
          }
        </div>

        <div className="main-action"
            >
          <span className="main-action-button center-vertically"
              onClick={this.setDone}  >
            <input
              disabled={this.state.unchanged}
              checked={this.state.done}
              onChange={()=>null}
              tabIndex={this.props.index+1}
              type="checkbox" style={{
              margin: 0,
            }} />
            <label style={{
              margin: 0,
              paddingLeft: "10px",
            }}>{getButtonTitle()}</label>
          </span>
          <button
            disabled={!this.state.diff && !this.state.update}
            tabIndex="-1"
            onClick={(e)=>this.setState({showExtraActions: !this.state.showExtraActions})}
            aria-label="Done" id="split-button-dropup" type="button" className="dropdown-toggle btn btn-default"> <span className="caret"></span></button>
        </div>
      </div>
    );

    return (
      <div className="translate-id">
        <p>{id}</p>
        {extraActions}
      </div>
  );
  }


  changeOriginal(event) {
    let newOriginal = "new";
    if ( this.state.originalView === "new" ) {
      newOriginal = "old";
    }
    this.setState({
      originalView: newOriginal
    })
  }

  setDone(event) {
    event.stopPropagation();

    if ( this.state.unchanged ) {
      return;
    }
    this.props.updateDone(this.props.field, !this.state.done);
  }

  resetTargetField() {
    if ( this.props.baseTargetField && this.props.baseTargetField.message ) {
      this.updateTargetField(this.props.baseTargetField.message);
    } else {
      this.updateTargetField("");
    }
    this.setState({
      showExtraActions: false,
    })
  }

  updateTargetField(value) {
    this.setState({
      target: value,
    }, () => {
      this.setState(
        Object.assign(
          Object.assign({}, this.state)
          , this.getFieldStates(this.props))
      );
    });

    this.props.updateTranslation(this.props.field, value);
  }

  handleTextAreaChange(event) {
    let value = event.target.value;
    this.updateTargetField(value);
  }
}

export default TranslateRow;
