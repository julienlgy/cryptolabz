import './searchbar.css'

import React from 'react';
import icon from './search_icon.svg'
import { Button,
  NavItem,
  NavLink } from 'reactstrap'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";
import API from "./../../../API"

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cryptos: [],
      search: '',
      suggestions: []
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

  updateSuggestions(searchString) {
    let candidates = []
    let search = searchString
    for (var index = 0; index < this.state.cryptos.length; index++) {
      if (this.state.cryptos[index].name.toUpperCase().includes(search)
          || this.state.cryptos[index].symbol.toUpperCase().includes(search)) {
        candidates.push(this.state.cryptos[index])
      }
    }
    this.setState({
      suggestions: candidates
    })
  }

  handleChangeText = (e) => {
    if (e.target.value !== undefined
        && e.target.value.toUpperCase!== undefined
        && e.target.value.length <= 2) {
      this.updateSuggestions(e.target.value.toUpperCase())
    }
    else if (e.target.firstChild !== undefined
        && e.target.firstChild !== null) {
      console.log("selected")
      console.log(e.target.firstChild)
    }
  }

  handleSearch() {
    this.props.onDoSearch(this.state.search)
  }

  render() {
    return (
      <NavItem className="searchbar">
        <NavLink>
          <Autocomplete
            id="search_suggestions"
            onInputChange={this.handleChangeText.bind(this)}
            options={this.state.suggestions}
            getOptionLabel={option => option.symbol + " " + option.name}
            renderInput={params => (
              <TextField
                  {...params}
                  label="Search"
                  fullWidth />
            )}
            style={{ width: "25ex" }}
          />
        </NavLink>
      </NavItem>
    );
  }
}

export default SearchBar;
