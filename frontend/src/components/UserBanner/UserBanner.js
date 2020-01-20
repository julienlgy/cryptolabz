import './userbanner.css'

import React from 'react';
import UserMenu from './UserMenu/UserMenu'
import { Button, Navbar } from 'reactstrap'

class UserBanner extends React.Component {
  handleClickSignIn() {

  }
  
  handleClickSignUp() {
    
  }

  render() {
    return (
        <Navbar color="light" expand="md" className="UseBanner navbar-default navbar-fixed-top">
          <Button type="button" color="light" btn-sm
            onClick={() => this.handleClickSignIn()}>
            Sign in
          </Button>
          <Button type="button" color="light" btn-sm
            onClick={() => this.handleClickSignUp()}>
            Sign up
          </Button>
          <UserMenu />
        </Navbar>
    );
  }
}

export default UserBanner;
