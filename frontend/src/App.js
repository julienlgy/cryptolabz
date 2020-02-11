import React from "react";
import { Router } from "react-router-dom";
import history from "./services/history";
import Routes from "./routes";
import UserBanner from "./components/UserBanner/UserBanner";
import Cryptolabz from "./components/Cryptolabz/Cryptolabz";
import MyAccount from "./components/MyAccount/MyAccount";
import Settings from "./components/Settings/Settings";
import Favorites from "./components/Favorites/Favorites";
import NewCrypto from "./components/NewCrypto/NewCrypto";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display_body: "Cryptolabz"
    };
  }

  handleEventHome = () => {
    this.setState({
      display_body: "Cryptolabz"
    });
  };

  handleEventUserMyAccount = () => {
    this.setState({
      display_body: "MyAccount"
    });
  };

  handleEventUserSettings = () => {
    this.setState({
      display_body: "Settings"
    });
  };

  handleEventCryptoFavorites = () => {
    this.setState({
      display_body: "Favorites"
    });
  };

  render() {
    return (
      <div className="App">
        <UserBanner
          onEventHome={this.handleEventHome}
          onEventUserMyAccount={this.handleEventUserMyAccount}
          onEventUserSettings={this.handleEventUserSettings}
          onEventCryptoFavorites={this.handleEventCryptoFavorites}
        />
        <Router history={history}>
          <Routes />
        </Router>
        {this.state.display_body === "MyAccount" && <MyAccount />}
        {this.state.display_body === "Settings" && <Settings />}
        {this.state.display_body === "Favorites" && <Favorites />}
      </div>
    );
  }
}

export default App;
