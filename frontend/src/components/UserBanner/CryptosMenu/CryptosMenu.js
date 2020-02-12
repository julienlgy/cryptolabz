import "./cryptosmenu.css";

import React from "react";
import cryptos_icon from "./cryptos_icon.svg";
import heart_icon from "./heart_icon.svg";
import graph_icon from "./graph_icon.svg";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class CryptosMenu extends React.Component {
  render() {
    return (
      <div className="cryptosmenu">
        <span>
          <img
              onClick={this.props.onEventCryptoFavorites}
              src={heart_icon}
              alt="favorite_cryptos_icon"
              longdesc="made by https://www.flaticon.com/authors/freepik"
              className="icon"
          />
        </span>
        <span>
          <img
              src={cryptos_icon}
              onClick={this.props.onEventCryptoAll}
              alt="all_cryptos_icon"
              longdesc="made by https://www.flaticon.com/authors/freepik"
              className="icon"
          />
        </span>
        <span>
          <img
              src={graph_icon}
              onClick={this.props.onEventCryptoTrending}
              alt="trending_cryptos_icon"
              longdesc="made by https://www.flaticon.com/authors/good-ware"
              className="icon"
          />
        </span>
        {/* <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            <img
              src={icon}
              alt="cryptos_menu_icon"
              longdesc="made by https://www.flaticon.com/authors/good-ware"
              className="icon"
            />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={this.props.onEventCryptoFavorites}>
              My Favorites
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Trending</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>All cryptos</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
      </div>
    );
  }
}

export default CryptosMenu;
