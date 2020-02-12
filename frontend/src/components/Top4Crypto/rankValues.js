import React, { Component } from "react";
import Variation from "./Variation";
import LineChart from "./LineChart/LineChart";

import axios from "axios";
import API from "./../../API"

class RankValues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      graph: []
    }
  }

  componentDidMount() {
    axios.get(API.url_crypto_home)
    .then(response => {
      var gr_temp = [];
      {response.data.graph.map((graph, index) => {
        if (!gr_temp[graph.symbol]) gr_temp[graph.symbol] = []
        gr_temp[graph.symbol].push({
          "x": gr_temp[graph.symbol].length,
          "y": graph.price
        })
      })}
      this.setState({ 
        data: response.data.cryptos, 
        graph: gr_temp
      });
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
          <th scope="row">{crypto.rank}</th>
          <td>
            {crypto.name} - {crypto.symbol}
          </td>
          <td>€{crypto.currentPrice}</td>
          <Variation value={(-((this.state.graph[crypto.symbol][0]['y'] * 100 / crypto.currentPrice) -100)).toFixed(2).toString()}/>
          <td>
            <LineChart data={this.state.graph[crypto.symbol]}/>
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
