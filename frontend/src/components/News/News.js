import React, { Component } from "react";
import "./News.css";
import PropTypes from "prop-types";

class News extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="News" class="col-12">
        <div class="dark-bg">
          <h2>News</h2>
          <article>
            <p>
              Sed commodo interdum auctor. Quisque sed elit lectus. Vivamus
              feugiat nisi diam, a mollis dolor egestas vitae. Morbi mollis sit
              amet libero non luctus. Phasellus at ipsum nulla. Donec commodo
              velit eget dignissim aliquam. Vestibulum id eleifend arcu. Donec
              tristique enim venenatis, ornare elit id, elementum dui. Duis eu
              elit pharetra, pharetra nunc posuere, pretium nisi. Vivamus ut
              volutpat libero.
            </p>
          </article>
        </div>
      </div>
    );
  }
}
News.propTypes = {};

export default News;
