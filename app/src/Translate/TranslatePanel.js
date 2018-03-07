import React, {Component} from 'react';
import TranslateRow from './TranslateRow'
import TranslateControls from './TranslateControls'
import './TranslatePanel.css'

class TranslatePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
      visible: {
        unchanged: true,
        todo: true,
        done: false
      },
      sort: false,
    }

    this.onVisibleChange = this.onVisibleChange.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  render() {
    let headSourceLanguage = this.props.languagesFiles["headSourceLanguage"];
    let baseSourceLanguage = this.props.languagesFiles["baseSourceLanguage"];
    let headTargetLanguage = this.props.languagesFiles["headTargetLanguage"];
    let baseTargetLanguage = this.props.languagesFiles["baseTargetLanguage"];

    let array = [];

    for (let field in headSourceLanguage) {
      array.push(
        <TranslateRow
          visible={this.state.visible}
          sort={this.state.sort}
          filter={this.state.filter}
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
        <TranslateControls
          visible={this.state.visible}
          sort={this.state.sort}
          filter={this.state.filter}
          onVisibleChange={this.onVisibleChange}
          onSortChange={this.onSortChange}
          onFilterChange={this.onFilterChange}
        />
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

  onVisibleChange(event) {
    if ( this.state.visible[event.target.name] !== event.target.checked ) {
      let newVisible = Object.assign({}, this.state.visible);
      newVisible[event.target.name] = event.target.checked;
      this.setState({
        visible: newVisible
      })
    }
  }

  onSortChange(event) {
    if ( event.target.value === "file"
      && this.state.sort ){
        this.setState({
          sort: false
        });
    } else if ( event.target.value === "alphabetical"
      && !this.state.sort) {
        this.setState({
          sort: true
        });
    }
  }

  onFilterChange(event) {
    this.setState({
      filter: event.target.value
    });
  }

  componentDidMount(){
    console.log("Translate mounted");
  }

  componentWillUnmount(){
    console.log("Translate unmounted");
  }

  componentDidUpdate(){
    console.log("Translate updated");
  }
}

export default TranslatePanel;
