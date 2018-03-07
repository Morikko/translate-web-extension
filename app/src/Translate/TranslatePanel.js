import React, {Component} from 'react';
import TranslateRow from './TranslateRow'
import TranslateControls from './TranslateControls'
import LanguageFiles from '../LanguageFiles'
import Mark from 'mark.js'
import './TranslatePanel.css'

class TranslatePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.state["filter"] = LanguageFiles.loadData("filter", '');
    this.state["visible"] = LanguageFiles.loadData("visible", {
      unchanged: true,
      todo: true,
      done: false
    });
    this.state["sort"] = LanguageFiles.loadData("sort", false);

    this.markSearch = this.markSearch.bind(this);
    this.unMarkFilter = this.unMarkFilter.bind(this);

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

    let fields = Object.keys(headSourceLanguage);
    if (this.state.sort) {
      fields = fields.sort();
    }

    array = fields.map((field, index)=>{
      return(<TranslateRow
        visible={this.state.visible}
        filter={this.state.filter}
        field={field} key={field}
        index={index*2}
         headSourceField={headSourceLanguage[field]} headTargetField={headTargetLanguage[field]} baseSourceField={baseSourceLanguage[field]} baseTargetField={baseTargetLanguage[field]} updateTranslation={this.props.updateTranslation} updateDone={this.props.updateDone} isDone={this.props.doneLog[field]}/>);
    });

    return (<div id="translate-panel">
      <div id="translate-controls">
        <TranslateControls visible={this.state.visible} sort={this.state.sort} filter={this.state.filter} onVisibleChange={this.onVisibleChange} onSortChange={this.onSortChange} onFilterChange={this.onFilterChange}/>
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
    if (this.state.visible[event.target.name] !== event.target.checked) {
      let newVisible = Object.assign({}, this.state.visible);
      newVisible[event.target.name] = event.target.checked;
      this.setState({visible: newVisible})
    }
  }

  onSortChange(event) {
    if (event.target.value === "file" && this.state.sort) {
      this.setState({sort: false});
    } else if (event.target.value === "alphabetical" && !this.state.sort) {
      this.setState({sort: true});
    }
  }

  onFilterChange(event) {
    this.setState({
      filter: event.target.value
    }, () => {
      if (this.state.filter.length) {
        this.markSearch();
      } else {
        this.unMarkFilter();
      }
    });
  }

  unMarkFilter() {
    let base = ":not(.hidden) ";
    let all = document.querySelectorAll(base + ".translate-id > p , " + base + ".translate-original , " + base + ".translate-description , " + base + ".translate-target ");

    (new Mark(all)).unmark({"element": "span", "className": "highlight"});
  }

  markSearch() {
    let filter = this.state.filter;
    let base = ":not(.hidden) ";
    let all = document.querySelectorAll(base + ".translate-id > p , " + base + ".translate-original , " + base + ".translate-description , " + base + ".translate-target");

    (new Mark(all)).unmark({
      "element": "span",
      "className": "highlight",
      done() {
        if (filter.length) {
          (new Mark(all)).mark(filter, {
            "element": "span",
            "className": "highlight"
          });
        }
      }
    });
  }

  componentDidMount() {
    // console.log("Translate mounted");
  }

  componentWillUnmount() {
    // console.log("Translate unmounted");
  }

  componentDidUpdate(prevProps, prevState) {
    sessionStorage.setItem("filter", JSON.stringify(this.state.filter));
    sessionStorage.setItem("visible", JSON.stringify(this.state.visible));
    sessionStorage.setItem("sort", JSON.stringify(this.state.sort));
  }

}

export default TranslatePanel;
