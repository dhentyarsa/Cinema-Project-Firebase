import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import {connect} from 'react-redux'
import {logout} from '../redux/action'

class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

onBtnLogout = () => {
  localStorage.removeItem('username')
  this.props.logout()
}

render() {
  if(this.props.role === 'user'){

      return (
        <div>
          <MDBNavbar light className='d-flex' expand="md" style={{color: 'black', backgroundImage: "url(" + "https://www.unpluginfinity.com/wp-content/uploads/2019/02/Unplginfinity-Website-Background.jpg" + ")",flexWrap: 'wrap', fontFamily: 'Bebas Neue, cursive', fontSize: '30px', backgroundPosition: 'center'}}>
            <div className='container'>
            <MDBNavbarBrand>
              <strong className="white-text" style={{fontSize: '50px'}}>
              <img src='http://athenacinema.com/wp-content/uploads/2019/11/Athena-Cinema-Logo-Black-2019.png' alt='cinepic' width='200px' height='100px'>
                </img>
              </strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
              <MDBNavbarNav left>
                <MDBNavItem active>
                  <MDBNavLink to="/">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/login">Features</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/register">Pricing</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <div className="d-none d-md-inline">Dropdown</div>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="#!">
                    <MDBIcon fab icon="twitter" />
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="#!">
                    <MDBIcon fab icon="google-plus-g" />
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      {
                      this.props.username
                      ?
                      this.props.username
                      :
                      'USER'
                      }
                    </MDBDropdownToggle>
                      {
                      this.props.role
                      ?
                      <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem href="/">Home</MDBDropdownItem>
                      <MDBDropdownItem divider></MDBDropdownItem>
                      <MDBDropdownItem onClick={this.onBtnLogout}>Log-Out</MDBDropdownItem>
                      </MDBDropdownMenu>
                      :
                      <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem href="/login">Log-In</MDBDropdownItem>
                      <MDBDropdownItem divider></MDBDropdownItem>
                      <MDBDropdownItem href="/register">Register</MDBDropdownItem>
                      </MDBDropdownMenu>
                      }
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
            </div>
          </MDBNavbar>
        </div>
        );
      }else if(this.props.role === 'admin'){
        return (
          <div>
            <MDBNavbar light className='d-flex' expand="md" style={{color: 'black', backgroundImage: "url(" + "https://www.unpluginfinity.com/wp-content/uploads/2019/02/Unplginfinity-Website-Background.jpg" + ")",flexWrap: 'wrap', fontFamily: 'Bebas Neue, cursive', fontSize: '30px', backgroundPosition: 'center'}}>
              <div className='container'>
              <MDBNavbarBrand>
                <strong className="white-text" style={{fontSize: '50px'}}>
                <img src='http://athenacinema.com/wp-content/uploads/2019/11/Athena-Cinema-Logo-Black-2019.png' alt='cinepic' width='200px' height='100px'>
                </img>
                </strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.toggleCollapse} />
              <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink to="/">Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/login">Features</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/register">Pricing</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <div className="d-none d-md-inline">Dropdown</div>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default">
                        <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                        <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                        <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                        <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="#!">
                      <MDBIcon fab icon="twitter" />
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="#!">
                      <MDBIcon fab icon="google-plus-g" />
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        {
                        this.props.username
                        ?
                        this.props.username
                        :
                        'USER'
                        }
                      </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-default">
                        <MDBDropdownItem href="/">Admin Menu</MDBDropdownItem>
                        <MDBDropdownItem href="/">Home</MDBDropdownItem>
                        <MDBDropdownItem divider></MDBDropdownItem>
                        <MDBDropdownItem onClick={this.onBtnLogout}>Log-Out</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
              </div>
            </MDBNavbar>
          </div>
          );
        }else{
        return (
          <div>
            <MDBNavbar light className='d-flex' expand="md" style={{color: 'black', backgroundImage: "url(" + "https://www.unpluginfinity.com/wp-content/uploads/2019/02/Unplginfinity-Website-Background.jpg" + ")",flexWrap: 'wrap', fontFamily: 'Bebas Neue, cursive', fontSize: '30px', backgroundPosition: 'center'}}>
              <div className='container'>
              <MDBNavbarBrand>
                <strong className="white-text" style={{fontSize: '50px'}}>
                  <img src='http://athenacinema.com/wp-content/uploads/2019/11/Athena-Cinema-Logo-Black-2019.png' alt='cinepic' width='200px' height='100px'>
                </img>
                </strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.toggleCollapse} />
              <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink to="/">Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/login">Features</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/register">Pricing</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <div className="d-none d-md-inline">Dropdown</div>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default">
                        <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                        <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                        <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                        <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="#!">
                      <MDBIcon fab icon="twitter" />
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink className="waves-effect waves-light" to="#!">
                      <MDBIcon fab icon="google-plus-g" />
                    </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        {
                        this.props.username
                        ?
                        this.props.username
                        :
                        'USER'
                        }
                      </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-default">
                        <MDBDropdownItem href="/login">Log-In</MDBDropdownItem>
                        <MDBDropdownItem divider></MDBDropdownItem>
                        <MDBDropdownItem href="/register">Register</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
              </div>
            </MDBNavbar>
          </div>
          );
        }
      }
}
    
const mapStatetoProps = (state) => {
  return{
    username: state.user.username,
    role: state.user.role
  }
}

export default connect(mapStatetoProps,{ logout })(NavbarPage);