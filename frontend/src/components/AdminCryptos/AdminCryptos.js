import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./admincryptos.css";

import Pagination from "react-js-pagination";
import { Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row } from 'reactstrap';

import axios from "axios";
import API from "./../../API"

class AdminCryptos extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cryptos: [],
        cryptosToDisplay: [],
        numberCryptosPerPage: 10,
        numberPage: 1,
      }
    }

    componentDidMount() {
      this.updateCryptos()
    }

    updateCryptos() {
      axios.get(API.url_crypto_all)
      .then(response => {
        let toDisplay = response.data.data.slice(
            (this.state.numberPage - 1) * this.state.numberCryptosPerPage,
            this.state.numberPage * this.state.numberCryptosPerPage)
        this.setState({ 
          cryptos: response.data.data,
          cryptosToDisplay: toDisplay
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

    handlePageChange = (pageNumber) => {
      let toDisplay = this.state.cryptos.slice(
          (pageNumber - 1) * this.state.numberCryptosPerPage,
          pageNumber * this.state.numberCryptosPerPage)
      this.setState({
        cryptosToDisplay: toDisplay,
        numberPage: pageNumber
      });
    }

    render() {
      return (
      <div className="admincryptos">
        <h1>Admin Cryptocurrencies</h1>
        <ListGroup>
          {this.state.cryptosToDisplay.map((crypto,index) =>
          <ListGroupItem
              key={index}>
            <Container>
              <Row>
                <Col
                    xs={{ size: 1}}
                    md={{ size: 2}}>
                  <img
                      className="icon"
                      alt={"image_" + crypto.symbol}
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
        <Pagination
          activePage={this.state.numberPage}
          itemsCountPerPage={this.state.numberCryptosPerPage}
          totalItemsCount={this.state.cryptos.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
          innerClass="pagination justify-content-center"
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    );
  }
}

export default AdminCryptos;
