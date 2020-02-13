import React from "react";
// import { Router } from "react-router-dom";
// import history from "./services/history";
// import Routes from "./routes";
import AdminCryptos from "./components/AdminCryptos/AdminCryptos";
import Cryptolabz from "./components/Cryptolabz/Cryptolabz";
import Favorites from "./components/Favorites/Favorites";
import MyAccount from "./components/MyAccount/MyAccount";
import Settings from "./components/Settings/Settings";
import UserBanner from "./components/UserBanner/UserBanner";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display_body: "Cryptolabz",
      userAccount: {}
    };
  }

  handleEventAdminCryptos = () => {
    this.setState({
      display_body: "AdminCryptos"
    });
  };

  handleEventAdminUsers = () => {
    console.log("TODO admin users")
    this.setState({
      display_body: "Cryptolabz"
    });
  };

  handleEventHome = () => {
    this.setState({
      display_body: "Cryptolabz"
    });
  };

  handleEventSignIn = user => {
    this.setState({
      userAccount: user
    });
  };

  handleEventSignOut = user => {
    this.setState({
      display_body: "Cryptolabz",
      userAccount: null
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
            userAccount={this.state.userAccount}
            onEventAdminCryptos={this.handleEventAdminCryptos}
            onEventAdminUsers={this.handleEventAdminUsers}
            onEventHome={this.handleEventHome}
            onEventSignIn={this.handleEventSignIn}
            onEventSignOut={this.handleEventSignOut}
            onEventUserMyAccount={this.handleEventUserMyAccount}
            onEventUserSettings={this.handleEventUserSettings}
            onEventCryptoFavorites={this.handleEventCryptoFavorites}/>
          {/* <Router history={history}>
            <Routes />
          </Router> */}
        {this.state.display_body === "AdminCryptos" && <AdminCryptos />}
        {this.state.display_body === "Cryptolabz" && <Cryptolabz />}
        {this.state.display_body === "MyAccount" && <MyAccount
            user={this.state.userAccount}
            onEventUpdate={this.handleEventSignIn}/>}
        {this.state.display_body === "Settings" && <Settings
            user={this.state.userAccount}/>}
        {this.state.display_body === "Favorites" && <Favorites />}
      </div>
    );
  }
}

export default App;
