import React from "react";
import "./cryptolabz.css";
import Top10Crypto from "../Top10Crypto/Top10Crypto";
import News from "../News/News";

class Cryptolabz extends React.Component {
  render() {
    return (
      <div className="Cryptolabz">
        <div class="cryptolabz text-center main-title">
          <h1 class="font-weight-bold">Become a crypto scientist !</h1>
        </div>
        <div class="container-fluid">
          <div class="row justify-content-around cryptolabz">
            <Top10Crypto />
          </div>
          <div class="row justify-content-around cryptolabz">
            <News />
          </div>
        </div>
      </div>
    );
  }
}

export default Cryptolabz;
