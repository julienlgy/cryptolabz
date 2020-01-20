import React from 'react';
import UserMenu from './UserMenu/UserMenu'
import './userbanner.css'

class UserBanner extends React.Component {
  render() {
    return (
      <div className="UserBanner">
        <button>Sign in</button>
        <button>Sign up</button>
        <UserMenu />
      </div>
    );
  }
}

export default UserBanner;
