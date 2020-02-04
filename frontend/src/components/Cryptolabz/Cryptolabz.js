import React from "react";
import "./cryptolabz.css";
import Top10Crypto from "../Top4Crypto/Top4Crypto";
import News from "../News/News";

class Cryptolabz extends React.Component {
  render() {
    return (
      <div className="Cryptolabz">
        <div class="jumbotron jumbotron-fluid shadow-sm p-3 mb-5">
          <div class="container">
            <h1 class="display-4">Become a crypto scientist !</h1>
          </div>
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
