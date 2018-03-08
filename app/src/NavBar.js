import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import {Navbar, Nav, MenuItem, NavDropdown} from 'react-bootstrap'
import './NavBar.css'

class AppNavBar extends Component {

  render() {
    return (
      <Navbar inverse collapseOnSelect style={{
        "borderRadius": "0px",
        "marginBottom": "0px"
      }}>
        <Navbar.Header>
          <Navbar.Toggle />
          <Navbar.Brand>
            Translate Web-Ext
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>

            <Navbar.Text >
              <NavLink to={`${this.props.match.url}/help`}
                        activeClassName="menu-selected">
                  Help
              </NavLink>
            </Navbar.Text>

            <Navbar.Text >
              <NavLink
                  to={`${this.props.match.url}/configure`}
                  activeClassName="menu-selected">
                  Configure</NavLink>
            </Navbar.Text>

            <Navbar.Text  >
              <NavLink
                  to={`${this.props.match.url}/translate`}
                  activeClassName="menu-selected">
                  Translate</NavLink>
            </Navbar.Text>
          <Nav>
            <NavDropdown eventKey={3} title="Project" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}
                onClick={this.props.onSave}>Save</MenuItem>
              <MenuItem eventKey={3.2}
                onClick={this.props.onReset}
                className="reset-project">Reset</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}
                onClick={this.props.onRelease}>Release</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

}

export default AppNavBar;
