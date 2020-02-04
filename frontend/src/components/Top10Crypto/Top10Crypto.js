import React, { Component } from "react";
import Variation from "./Variation";
import "./Top10Crypto.css";
import { Table } from "reactstrap";

class Top10Crypto extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="col-12 col-md-8">
        <div class="rounded-lg">
          <div class="table-responsive shadow-lg p-3 mb-5 bg-white rounded">
            <Table borderless hover>
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
                  <Variation value="+0.07%" />
                  <td>graph</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Etherum</td>
                  <td>€156.35</td>
                  <Variation value="+0.12%" />
                  <td>graph</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Bitcoin Cash</td>
                  <td>€308.70</td>
                  <Variation value="+0.86%" />
                  <td>graph</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Litecoin</td>
                  <td>€51.77</td>
                  <Variation value="-0.19%" />
                  <td>graph</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }

  renderChangesColor() {}
}
Top10Crypto.propTypes = {};

export default Top10Crypto;
