import './searchbar.css'

import React from 'react';
import icon from './search_icon.svg'
import { Button,
  NavItem,
  NavLink } from 'reactstrap'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { search: '' }
  }

  handleChangeText = (e) => {
    this.setState({
      ...this.state,
      search: e.target.value
    });
    this.props.onUpdateSearch(this.state.search)
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
