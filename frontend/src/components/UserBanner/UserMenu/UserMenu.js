import React from 'react';
import icon from './icon.svg'
import './usermenu.css'

class UserMenu extends React.Component {
  render() {
    return (
      <div className="UserMenu">
        <img src={icon} className="icon" alt="user_menu_icon"
        longdesc="https://www.flaticon.com/"
        className="icon"/>
      </div>
    );
  }
}

export default UserMenu;
