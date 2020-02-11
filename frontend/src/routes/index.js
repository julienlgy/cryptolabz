import React from "react";
import { Switch, Route } from "react-router-dom";
import Cryptolabz from "../components/Cryptolabz/Cryptolabz";
import Favorites from "../components/Favorites/Favorites";
import MyAccount from "../components/MyAccount/MyAccount";
import Settings from "../components/Settings/Settings";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={Cryptolabz} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/myaccount" component={MyAccount} />
      <Route path="/settings" component={Settings} />
    </Switch>
  );
}
