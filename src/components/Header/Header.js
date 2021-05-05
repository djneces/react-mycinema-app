import React from 'react';

import GoogleAuth from '../GoogleAuth/GoogleAuth';
import logo from '../../assets/images/logo.png';
import './Header.scss';

const Header = () => {
  return (
    <div className='Header'>
      <div className='Header__logo'>
        <img src={logo} alt='website logo icon' />
      </div>
      <div className='Header__googleLogin'>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
