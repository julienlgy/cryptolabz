import React from "react";
import { Switch, Route } from "react-router-dom";
import Cryptolabz from "../components/Cryptolabz/Cryptolabz";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={Cryptolabz} />
    </Switch>
  );
}
