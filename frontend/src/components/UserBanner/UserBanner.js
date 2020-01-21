import './userbanner.css'

import React from 'react';
import CryptosMenu from './CryptosMenu/CryptosMenu'
import UserMenu from './UserMenu/UserMenu'
import { Button,
  Nav,
  Navbar } from 'reactstrap'

class UserBanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isAuthentified: false }
  }

  handleClickSignIn() {
    this.setState({
      ...this.state,
      isAuthentified: true
    });
  }
  
  handleClickSignUp() {
    this.setState({
      ...this.state,
      isAuthentified: true
    });
  }
  
  handleClickSignOut() {
    this.setState({
      ...this.state,
      isAuthentified: false
    });
  }

  renderSignIn() {
    return(
      <Button type="button" color="light" btn-sm
        onClick={() => this.handleClickSignIn()}>
        Sign in
      </Button>
    )
  }

  renderSignUp() {
    return(
      <Button type="button" color="light" btn-sm
        onClick={() => this.handleClickSignUp()}>
        Sign up
      </Button>
    )
  }

  renderSignOut() {
    return(
      <Button type="button" color="light" btn-sm
        onClick={() => this.handleClickSignOut()}>
        Sign out
      </Button>
    )
  }

  render() {
    return (
        <Navbar color="light" expand="md" fixed="top"
          className="UseBanner navbar-default">
            <div className="mr-auto">
              <h1>Cryptolabz</h1>
            </div>

            <Nav pullRight>
              { !this.state.isAuthentified && this.renderSignIn() }
              { !this.state.isAuthentified && this.renderSignUp() }

              { this.state.isAuthentified && <CryptosMenu /> }
              { this.state.isAuthentified && <UserMenu /> }
              { this.state.isAuthentified && this.renderSignOut() }

            </Nav>
        </Navbar>
    );
  }
}

export default UserBanner;
