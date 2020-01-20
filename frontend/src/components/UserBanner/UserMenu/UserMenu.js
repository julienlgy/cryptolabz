import './usermenu.css'

import React from 'react';
import icon from './icon.svg'
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
            longdesc="https://www.flaticon.com/"
            className="icon"/>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              Option 1
            </DropdownItem>
            <DropdownItem>
              Option 2
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              Reset
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </span>
    );
  }
}

export default UserMenu;
