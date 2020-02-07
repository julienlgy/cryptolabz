import React from "react";
import UserBanner from "./components/UserBanner/UserBanner";
import Cryptolabz from "./components/Cryptolabz/Cryptolabz";
import MyAccount from "./components/MyAccount/MyAccount";
import Settings from "./components/Settings/Settings";
import Favorites from "./components/Favorites/Favorites";

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
      display_body: 'Favorites'
    })
  }

  render() {
    return (
      <div className="App">
        <UserBanner
            onEventHome={this.handleEventHome}
            onEventUserMyAccount={this.handleEventUserMyAccount}
            onEventUserSettings={this.handleEventUserSettings}
            onEventCryptoFavorites={this.handleEventCryptoFavorites}/>
          {this.state.display_body === 'Cryptolabz' && <Cryptolabz />}
          {this.state.display_body === 'MyAccount' && <MyAccount />}
          {this.state.display_body === 'Settings' && <Settings />}
          {this.state.display_body === 'Favorites' && <Favorites />}
      </div>
    );
  }
}

export default App;
