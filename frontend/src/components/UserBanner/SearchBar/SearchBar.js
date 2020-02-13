import './searchbar.css'

import React from 'react';
import icon from './search_icon.svg'
import { Button,
  NavItem,
  NavLink } from 'reactstrap'
import axios from "axios";
import API from "./../../../API"

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cryptos: [],
      search: ''
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

  handleChangeText = (e) => {
    if (e.target.value.length <= 2)
      return
      
    let candidates = []
    let search = e.target.value.toUpperCase()
    for (var index = 0; index < this.state.cryptos.length; index++) {
      if (this.state.cryptos[index].name.toUpperCase().includes(search)
          || this.state.cryptos[index].symbol.toUpperCase().includes(search)) {
        candidates.push(this.state.cryptos[index])
      }
    }
    console.log(candidates)

  //   this.setState({
  //     search: e.target.value
  //   });
  //  this.props.onUpdateSearch(this.state.search)
  }

  handleSearch() {
    this.props.onDoSearch(this.state.search)
  }

  render() {
    return (
      <NavItem className="searchbar">
        <NavLink>
          <input
            type="text"
            onChange={this.handleChangeText.bind(this)}/> 
          <Button type="button"
              onClick={() => this.handleSearch()}>
            <img
                src={icon}
                alt="search_icon"
                longdesc="made by https://www.flaticon.com/authors/smartline"
                className="icon"/>
          </Button>
        </NavLink>
      </NavItem>
    );
  }
}

export default SearchBar;
