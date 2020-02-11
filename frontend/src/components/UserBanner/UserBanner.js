import "./userbanner.css";

import React from "react";
import CryptosMenu from "./CryptosMenu/CryptosMenu";
import UserMenu from "./UserMenu/UserMenu";
import SearchBar from "./SearchBar/SearchBar";
import OverlaySignIn from "./OverlaySignIn/OverlaySignIn"
import OverlaySignUp from "./OverlaySignUp/OverlaySignUp"
import { Button, Nav, Navbar } from "reactstrap";

import API from '../../API'

class UserBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display_overlay: '',
      isAuthentified: false,
      userAccount: null
    };
  }

  handleCancel = () => {
    this.setState({
      display_overlay: ''
    });
  }

  handleClickSignIn() {
    this.setState({
      display_overlay: 'signIn'
    });
  }

  handleClickSignUp() {
    this.setState({
      display_overlay: 'signUp'
    });
  }

  handleClickSignOut() {
    API.token = null
    this.setState({
      isAuthentified: false,
      userAccount: null
    });
    this.props.onEventSignOut()
  }

  handleEventSignIn = (user) => {
    this.setState({
      display_overlay: '',
      isAuthentified: true,
      userAccount: user
    });
    this.props.onEventSignIn(user)
  }

  handleUpdateSearch = search_string => {};

  handleDoSearch = search_string => {
    console.log("todo: do search " + search_string);
  };

  renderSignIn() {
    return (
      <Button
        type="button"
        color="dark"
        onClick={() => this.handleClickSignIn()}
      >
        Sign in
      </Button>
    );
  }

  renderSignUp() {
    return (
      <Button
        type="button"
        color="dark"
        onClick={() => this.handleClickSignUp()}
      >
        Sign up
      </Button>
    );
  }

  renderSignOut() {
    return (
      <Button
        type="button"
        color="dark"
        onClick={() => this.handleClickSignOut()}
      >
        Sign out
      </Button>
    );
  }

  render() {
    return (
      <div className="userbanner">
        {this.state.display_overlay === 'signIn' && <OverlaySignIn
            onEventSignIn={this.handleEventSignIn}
            onCancel={this.handleCancel}/>}
        {this.state.display_overlay === 'signUp' && <OverlaySignUp
            onEventSignIn={this.handleEventSignIn}
            onCancel={this.handleCancel}/>}
        <Navbar
          color="dark"
          expand="md"
          fixed="top"
          className="userbanner navbar-default navbar-size"
        >
          <div className="mr-auto" onClick={this.props.onEventHome}>
            <span className="cryptolabz">Cryptolabz</span>
          </div>

          <Nav>
            {!this.state.isAuthentified && this.renderSignIn()}
            {!this.state.isAuthentified && this.renderSignUp()}

            {this.state.isAuthentified && (
              <SearchBar
                onUpdateSearch={this.handleUpdateSearch}
                onDoSearch={this.handleDoSearch}
              />
            )}
            {this.state.isAuthentified && (
              <CryptosMenu
                onEventCryptoFavorites={this.props.onEventCryptoFavorites}
              />
            )}
            {this.state.isAuthentified && (
              <UserMenu
                onEventUserMyAccount={this.props.onEventUserMyAccount}
                onEventUserSettings={this.props.onEventUserSettings}
                onEventSignOut={() => this.handleClickSignOut()}
              />
            )}
            {this.state.isAuthentified && this.renderSignOut()}
          </Nav>
        </Navbar>
        <div className="navbar-size"></div>
      </div>
    );
  }
}

export default UserBanner;
