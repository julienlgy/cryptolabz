import React from "react";
import UserBanner from "./components/UserBanner/UserBanner";
import Cryptolabz from "./components/Cryptolabz/Cryptolabz";

class App extends React.Component {
  render() {
    return (
      <div className="App container-fluid">
        <UserBanner />
        <Cryptolabz />
      </div>
    );
  }
}

export default App;
