import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./allcryptos.css";

import { Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row } from 'reactstrap';

import axios from "axios";
import API from "./../../API"

class AllCryptos extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cryptos: [],
      }
    }

    componentDidMount() {
      axios.get(API.url_crypto_all)
      .then(response => {
        this.setState({ 
          cryptos: response.data.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
    }

    render() {
      return (
      <div className="admincryptos">
        <h1>Admin Cryptocurrencies</h1>
        <ul>
          {this.state.cryptos.map((crypto,index) =>
          <div
              key={index}>
            <img
                className="icon"
                alt={"image_" + crypto.symbol}
                src={crypto.imgUrl} />
              {crypto.symbol + " - " + crypto.name}
          </div>
          )}
        </ul>
      </div>
    );
  }
}

export default AllCryptos;
