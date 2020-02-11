import './usermenu.css'

import React from 'react';
import icon from './user_icon.svg'
import { UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap'

class UserMenu extends React.Component {
  render() {
    return (
      <span className="usermenu">
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
          <img src={icon} alt="user_menu_icon"
            longdesc="made by https://www.flaticon.com/authors/freepik"
            className="icon"/>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
                onClick={this.props.onEventUserMyAccount}>
              My account
            </DropdownItem>
            <DropdownItem
                onClick={this.props.onEventUserSettings}>
              Settings
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              Log out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </span>
    );
  }
}

export default UserMenu;
