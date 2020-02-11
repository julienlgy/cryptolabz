import "./cryptosmenu.css";

import React from "react";
import icon from "./graph_icon.svg";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class CryptosMenu extends React.Component {
  render() {
    return (
      <span className="cryptosmenu">
        <UncontrolledDropdown nav inNavbar>
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
        </UncontrolledDropdown>
      </span>
    );
  }
}

export default CryptosMenu;
