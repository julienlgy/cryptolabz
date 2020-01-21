import React, { Component } from "react";
import "./Top10Crypto.css";
import PropTypes from "prop-types";

class Top10Crypto extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Top10Crypto" class="col-6 box">
        <div class="col-md-12">Top10Crypto</div>
      </div>
    );
  }
}
Top10Crypto.propTypes = {};

export default Top10Crypto;
