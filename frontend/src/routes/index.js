import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
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
