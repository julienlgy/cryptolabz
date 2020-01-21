import React from "react";
import "./cryptolabz.css";
import Top10Crypto from "../Top10Crypto/Top10Crypto";
import News from "../News/News";

class Cryptolabz extends React.Component {
  render() {
    return (
      <div className="Cryptolabz">
        <div class="container-fluid">
          <div class="row cryptolabz">
            <Top10Crypto />
            <News />
          </div>
        </div>
      </div>
    );
  }
}

export default Cryptolabz;
