import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown, FormControl, Checkbox, FormGroup, Radio} from 'react-bootstrap'
import './TranslateControls.css'

class TranslateControls extends Component {
  constructor(props){
    super(props);

    this.state = {
      filter: props.filter,
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filter: nextProps.filter,
    });
  }

  render(){
    return (
      <Navbar inverse collapseOnSelect style={{
        "borderRadius": "0px",
        "marginBottom": "0px",
        "flex": 1,
      }}>
        <Navbar.Header>
          <Navbar.Brand>
            Controls
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {
              /*
            <Navbar.Form pullLeft>
            <FormControl
              onChange={this.handleFilterChange}
              type="text" placeholder="Filter..."
              value={this.state.filter}/>
            </Navbar.Form >
              */
          }
          
          <Nav>
            <NavDropdown title="Visible" id="visible-nav-dropdown">
              <FormGroup style={{
                "padding": "5px"
              }}>
                <Checkbox
                  checked={this.props.visible.unchanged}
                  onChange={this.props.onVisibleChange}
                  name="unchanged">
                  Unchanged
                </Checkbox>
                <Checkbox
                  checked={this.props.visible.todo}
                  onChange={this.props.onVisibleChange}
                  name="todo">
                  Todo
                </Checkbox>
                <Checkbox
                  checked={this.props.visible.done}
                  onChange={this.props.onVisibleChange}
                  name="done"
                  value="">
                  Done
                </Checkbox>
              </FormGroup>
            </NavDropdown>
            <NavDropdown title="Sort" id="sort-nav-dropdown">
              <FormGroup style={{
                "padding": "5px"
              }}>
                  <Radio
                    checked={!this.props.sort}
                    onChange={this.props.onSortChange}
                    name="sort"
                    value="file">
                    File order
                  </Radio>
                  <Radio
                    checked={this.props.sort}
                    onChange={this.props.onSortChange}
                    name="sort"
                    value="alphabetical">
                    Alphabetical
                </Radio>
              </FormGroup>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  handleFilterChange(event){
    this.setState({
      filter: event.target.value
    });

    this.props.onFilterChange(event);
  }
}

export default TranslateControls
