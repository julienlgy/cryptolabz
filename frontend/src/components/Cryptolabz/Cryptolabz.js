import React from "react";
import "./cryptolabz.css";
import Top10Crypto from "../Top10Crypto/Top10Crypto";
import News from "../News/News";

class Cryptolabz extends React.Component {
  render() {
    return (
      <div className="Cryptolabz">
        <div className="cryptolabz text-center main-title">
          <h1 className="font-weight-bold">Become a crypto scientist !</h1>
        </div>
        <div className="container-fluid">
          <div className="row justify-content-around cryptolabz">
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
