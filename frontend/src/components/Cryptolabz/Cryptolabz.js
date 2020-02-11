import React from "react";
import "./cryptolabz.css";
import Top10Crypto from "../Top4Crypto/Top4Crypto";
import News from "../News/News";

class Cryptolabz extends React.Component {
  render() {
    return (
      <div className="Cryptolabz">
        <div className="jumbotron jumbotron-fluid shadow-sm p-3 mb-5">
          <div className="container">
            <h1 className="display-4">Become a crypto scientist !</h1>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-around cryptolabz">
            <Top10Crypto />
          </div>
        </div>
        <div className="container-fluid news-bg">
          <div className="container">
            <div className="row justify-content-around cryptolabz">
              <News />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cryptolabz;
