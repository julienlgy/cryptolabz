import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./allcryptos.css";

import Pagination from "react-js-pagination";
import { Col, Container } from 'reactstrap';
import axios from "axios";
import API from "./../../API"

class AllCryptos extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cryptos: [],
        cryptosToDisplay: [],
        numberCryptosPerPage: 15,
        numberPage: 1,
      }
    }

    componentDidMount() {
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
      <div className="allcryptos">
        <h1>Cryptocurrencies</h1>
        <Container>
          {this.state.cryptosToDisplay.map((crypto,index) =>
          <Col
              xs={{ size: 3}}
              className="list-inline-item align-top"
              onClick={() => {this.props.onEventVisualizeCrypto(crypto.symbol)}}
              key={index}>
            <img
                className="icon"
                alt={"image_" + crypto.symbol}
                src={crypto.imgUrl}
            />
            <div className="label">
              {crypto.symbol + " - " + crypto.name}
            </div>
          </Col>
          )}
        </Container>
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

export default AllCryptos;
