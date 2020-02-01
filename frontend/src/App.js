import React from "react";
import UserBanner from "./components/UserBanner/UserBanner";
import Cryptolabz from "./components/Cryptolabz/Cryptolabz";
import MyAccount from "./components/MyAccount/MyAccount";
import Settings from "./components/Settings/Settings";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display_body: 'Cryptolabz'
    };
  }

  handleEventUserMyAccount = () => {
    this.setState({
      display_body: 'MyAccount'
    })
  }

  handleEventUserSettings = () => {
    this.setState({
      display_body: 'Settings'
    })
  }

  render() {
    return (
      <div className="App">
        <UserBanner
            onEventUserMyAccount={this.handleEventUserMyAccount}
            onEventUserSettings={this.handleEventUserSettings}/>
          {this.state.display_body === 'Cryptolabz' && <Cryptolabz />}
          {this.state.display_body === 'MyAccount' && <MyAccount />}
          {this.state.display_body === 'Settings' && <Settings />}
      </div>
    );
  }
}

export default App;
