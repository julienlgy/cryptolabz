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
      userAccount: this.props.userAccount
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.userAccount === null || this.state.userAccount === null
        || this.props.userAccount.username === this.state.userAccount.username)
      return
    this.setState({
      userAccount: this.props.userAccount
    })
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

  renderNotAuthentified() {
    return (
      <Nav>
        <Button
          type="button"
          color="dark"
          onClick={() => this.handleClickSignIn()}
        >
          Sign in
        </Button>
        <Button
          type="button"
          color="dark"
          onClick={() => this.handleClickSignUp()}
        >
          Sign up
        </Button>
      </Nav>
    );
  }

  renderAuthentified() {
    return (
      <Nav>
        <p className="welcome">
          Bienvenue {this.state.userAccount.username}
        </p>
        <SearchBar
          onUpdateSearch={this.handleUpdateSearch}
          onDoSearch={this.handleDoSearch}
        />
        <CryptosMenu
          onEventCryptoAll={this.props.onEventCryptoAll}
          onEventCryptoFavorites={this.props.onEventCryptoFavorites}
          onEventCryptoTrending={this.props.onEventCryptoTrending}
        />
        <UserMenu
          onEventUserMyAccount={this.props.onEventUserMyAccount}
          onEventUserSettings={this.props.onEventUserSettings}
          onEventSignOut={() => this.handleClickSignOut()}
        />
        <Button
          type="button"
          color="dark"
          onClick={() => this.handleClickSignOut()}
        >
          Sign out
        </Button>
      </Nav>
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

          {!this.state.isAuthentified && this.renderNotAuthentified()}
          {this.state.isAuthentified && this.renderAuthentified()}
        </Navbar>
        <div className="navbar-size"></div>
      </div>
    );
  }
}

export default UserBanner;
