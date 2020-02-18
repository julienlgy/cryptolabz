import './adminmenu.css'

import React from 'react';
import icon from './admin_icon.svg'
import { UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap'

class AdminMenu extends React.Component {
  render() {
    return (
      <span className="adminmenu">
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
          <img src={icon} alt="admin_menu_icon"
            longdesc="made by https://www.flaticon.com/authors/smashicons"
            className="icon"/>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
                onClick={this.props.onEventAdminUsers}>
              Users
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
                onClick={this.props.onEventAdminCryptos}>
              Cryptos
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </span>
    );
  }
}

export default AdminMenu;
