import React, { Component } from "react";
import RankValues from "./rankValues";
import { Table } from "reactstrap";

class Top10Crypto extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="col-12">
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
                <RankValues />
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
