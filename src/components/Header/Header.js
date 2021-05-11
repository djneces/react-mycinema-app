import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import logo from '../../assets/images/logo.png';
import './Header.scss';

const Header = () => {
  return (
    <div className='Header'>
      <div className='Header__logo'>
        <Link to='/'>
          <img src={logo} alt='website logo icon' />
        </Link>
      </div>
      <div className='Header__googleLogin'>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
