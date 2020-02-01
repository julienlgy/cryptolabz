import React, { Component } from "react";
import "./Top10Crypto.css";
import PropTypes from "prop-types";

class Top10Crypto extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Top10Crypto" class="col-8">
        <div class="dark-bg rounded-lg">
          <h2>#4 Crypto</h2>
          <div class="table-responsive">
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Change</th>
                  <th scope="col">Chart</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Bitcoin</td>
                  <td>€7340.20</td>
                  <td>+0.07%</td>
                  <td>graph</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Etherum</td>
                  <td>€156.35</td>
                  <td>+0.12%</td>
                  <td>graph</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Bitcoin Cash</td>
                  <td>€308.70</td>
                  <td>+0.86%</td>
                  <td>graph</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Litecoin</td>
                  <td>€51.77</td>
                  <td>-0.19%</td>
                  <td>graph</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
Top10Crypto.propTypes = {};

export default Top10Crypto;
