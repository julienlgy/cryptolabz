import React, { Component } from "react";
import "./News.css";
import PropTypes from "prop-types";

class News extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="News" class="col-6 box">
        <div class="col-md-12">NEWS OUAIS</div>
      </div>
    );
  }
}
News.propTypes = {};

export default News;
