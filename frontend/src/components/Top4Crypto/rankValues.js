import React, { Component } from "react";
// import Variation from "./Variation";
// import LineChart from "./LineChart/LineChart";

import axios from "axios";
import API from "./../../API"

class RankValues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    axios.get(API.url_crypto + "btc,eth")
    .then(response => {
      this.setState({ data: response.data.data });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (<tbody>
      {this.state.data.map((crypto, index) =>
        <tr
            key={index}>
          <th scope="row">{"rank"}</th>
          <td>
            {crypto.name} - {crypto.symbol}
          </td>
          <td>€{crypto.currentPrice}</td>
          <td>
          </td>
        </tr>
      )}
    </tbody>)
  }

  // render() {
  //   return (<thbody>
  //     {data.map((rank, name, code, price, change, graph) =>
  //       <tr>
  //         <th scope="row">{rank}</th>
  //         <td>
  //           {name} - {code}
  //         </td>
  //         <td>€{price}</td>
  //         <Variation value={change} />
  //         <td>
  //           <LineChart data={graph} />
  //         </td>
  //       </tr>
  //     )}
  //   </thbody>)
  // }

}

export default RankValues;
