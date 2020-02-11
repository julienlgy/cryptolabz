import React, { Component } from "react";
import RankValues from "./rankValues";
import { Table } from "reactstrap";

class Top10Crypto extends Component {
  render() {
    return (
      <div className="col-12">
        <div className="table-responsive shadow-lg mb-5 bg-white rounded-lg">
          <Table borderless hover responsive>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Change</th>
                <th scope="col">Chart</th>
              </tr>
            </thead>
            <RankValues />
          </Table>
        </div>
      </div>
    );
  }

  renderChangesColor() {}
}
Top10Crypto.propTypes = {};

export default Top10Crypto;
