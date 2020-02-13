import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./admincryptos.css";

import { Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row } from 'reactstrap';

import axios from "axios";
import API from "./../../API"

class Cryptolabz extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cryptos: [],
      }
    }

    componentDidMount() {
      this.updateCryptos()
    }

    updateCryptos() {
      axios.get(API.url_crypto_all)
      .then(response => {
        console.log(response.data.data)
        this.setState({ 
          cryptos: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
    }

    handleDeleteCrypto = (index) => {
      if (index > this.state.cryptos.size || index < 0) {
        return
      }
      console.log("TODO delete crypto" + this.state.cryptos[index].symbol)
      axios.delete(API.url_crypto_delete + this.state.cryptos[index].symbol,
            {}, API.getAuthHeaders())
      .then(response => {
        this.updateCryptos()
      })
      .catch(error => {
        console.log(error);
      });
    }

    render() {
      return (
      <div className="admincryptos">
        <h1>Admin cryptocurrencies</h1>
        <ListGroup>
          {this.state.cryptos.map((crypto,index) =>
          <ListGroupItem
              key={index}>
            <Container>
              <Row>
                <Col
                    xs={{ size: 1}}
                    md={{ size: 2}}>
                  <img
                      className="icon"
                      src={crypto.imgUrl} />
                </Col>
                <Col
                    xs={{ size: 2}}
                    md={{ size: 1}}>
                  {crypto.symbol}
                </Col>
                <Col
                    xs={{ size: 6}}
                    md={{ size: 5}}>
                  {crypto.name}
                </Col>
                <Col
                    xs={{ size: 1}}>
                  <Button
                      color="danger"
                      onClick={() => this.handleDeleteCrypto(index)}>
                    Delete
                  </Button>
                </Col>
              </Row>
            </Container>
          </ListGroupItem>
          )}
        </ListGroup>
      </div>
    );
  }
}

export default Cryptolabz;
