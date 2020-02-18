import React from "react";
// import { Router } from "react-router-dom";
// import history from "./services/history";
// import Routes from "./routes";
import AdminCryptos from "./components/AdminCryptos/AdminCryptos";
import AdminUsers from "./components/AdminUsers/AdminUsers";
import AllCryptos from "./components/AllCryptos/AllCryptos";
import Cryptolabz from "./components/Cryptolabz/Cryptolabz";
import Favorites from "./components/Favorites/Favorites";
import MyAccount from "./components/MyAccount/MyAccount";
import OneCrypto from "./components/OneCrypto/OneCrypto";
import Settings from "./components/Settings/Settings";
import UserBanner from "./components/UserBanner/UserBanner";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptoSymbol: "",
      displayBody: "Cryptolabz",
      userAccount: {}
    };
  }

  handleEventAdminCryptos = () => {
    this.setState({
      displayBody: "AdminCryptos"
    });
  };

  handleEventAdminUsers = () => {
    this.setState({
      displayBody: "AdminUsers"
    });
  };

  handleEventCryptoAll = () => {
    this.setState({
      displayBody: "AllCryptos"
    });
  };

  handleEventCryptoFavorites = () => {
    this.setState({
      displayBody: "Favorites"
    });
  };

  handleEventHome = () => {
    this.setState({
      displayBody: "Cryptolabz"
    });
  };

  handleEventSignIn = user => {
    this.setState({
      userAccount: user
    });
  };

  handleEventSignOut = user => {
    this.setState({
      displayBody: "Cryptolabz",
      userAccount: undefined
    });
  };

  handleEventUserMyAccount = () => {
    this.setState({
      displayBody: "MyAccount"
    });
  };

  handleEventUserSettings = () => {
    this.setState({
      displayBody: "Settings"
    });
  };

  handleEventVisualizeCrypto = (symbol) => {
    this.setState({
      displayBody: "OneCrypto",
      cryptoSymbol: symbol
    })
  }

  render() {
    return (
      <div className="App">
        <UserBanner
            userAccount={this.state.userAccount}
            onEventAdminCryptos={this.handleEventAdminCryptos}
            onEventAdminUsers={this.handleEventAdminUsers}
            onEventCryptoAll={this.handleEventCryptoAll}
            onEventCryptoFavorites={this.handleEventCryptoFavorites}
            onEventCryptoTrending={this.handleEventHome}
            onEventHome={this.handleEventHome}
            onEventSignIn={this.handleEventSignIn}
            onEventSignOut={this.handleEventSignOut}
            onEventUserMyAccount={this.handleEventUserMyAccount}
            onEventUserSettings={this.handleEventUserSettings}
            onEventVisualizeCrypto={this.handleEventVisualizeCrypto}/>
          {/* <Router history={history}>
            <Routes />
          </Router> */}
        {this.state.displayBody === "AdminCryptos" && <AdminCryptos />}
        {this.state.displayBody === "AdminUsers" && <AdminUsers />}
        {this.state.displayBody === "AllCryptos" && <AllCryptos
            onEventVisualizeCrypto={this.handleEventVisualizeCrypto} />}
        {this.state.displayBody === "Cryptolabz" && <Cryptolabz />}
        {this.state.displayBody === "MyAccount" && <MyAccount
            user={this.state.userAccount}
            onEventUpdate={this.handleEventSignIn}/>}
        {this.state.displayBody === "OneCrypto" && <OneCrypto
            cryptoSymbol={this.state.cryptoSymbol} />}
        {this.state.displayBody === "Settings" && <Settings
            user={this.state.userAccount}/>}
        {this.state.displayBody === "Favorites" && <Favorites
            user={this.state.userAccount}/>}
      </div>
    );
  }
}

export default App;
