import React, { Component } from 'react';
import {
  authInit,
  googleSignIn,
  googleSignOut,
  onAuthChange,
} from '../../store/actions/auth';
import { connect } from 'react-redux';
import { toggleAccountDetails } from '../../store/actions/accountDetailsMenu';
import { clearMovie } from '../../store/actions/movies';
import { clearSeats } from '../../store/actions/seats';
import { clearAllAddOns } from '../../store/actions/addons';
import CustomBtnOutline from '../CustomBtnOutline/CustomBtnOutline';

import './GoogleAuth.scss';

class GoogleAuth extends Component {
  async componentDidMount() {
    this.googleAuth = await this.props.authInit();
    //listening for Auth changes
    this.authChange();
    this.googleAuth.isSignedIn.listen(this.authChange);
  }

  //is called whenever user's auth status changes
  authChange = () => {
    this.props.onAuthChange(this.googleAuth);
  };

  //sign In
  onSignInClick = () => {
    this.props.googleSignIn(this.googleAuth);
  };

  //sign Out
  onSignOutClick = () => {
    this.props.googleSignOut(this.googleAuth);
    this.props.toggleAccountDetails();
    this.props.clearMovie();
    this.props.clearSeats();
    this.props.clearAllAddOns();
  };

  toggleMenu = () => {
    this.props.toggleAccountDetails();
  };

  renderAuthButton() {
    const { isAuthenticated, username, toggle } = this.props;

    if (isAuthenticated === null) {
      return null;
    } else if (isAuthenticated && !toggle) {
      return (
        <div className='GoogleAuth__userProfile'>
          <span>Hello, </span>
          <span>{username}</span>
          <i className='far fa-user' onClick={this.toggleMenu}></i>
        </div>
      );
    } else if (isAuthenticated && toggle) {
      return (
        <div
          className='GoogleAuth__userProfile-logout'
          onClick={this.onSignOutClick}
        >
          <i className='fas fa-sign-out-alt'></i> Logout
        </div>
      );
    } else {
      return (
        <div className='GoogleAuth__userProfile'>
          <CustomBtnOutline onclick={this.onSignInClick}>
            Sign In with Google
            <i className='fab fa-google'></i>
          </CustomBtnOutline>
        </div>
      );
    }
  }

  render() {
    return <div className='GoogleAuth'>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = ({ auth, toggleMenu }) => ({
  isAuthenticated: auth.isAuthenticated,
  username: auth.currentUser?.username,
  toggle: toggleMenu,
});

export default connect(mapStateToProps, {
  authInit,
  googleSignIn,
  googleSignOut,
  onAuthChange,
  toggleAccountDetails,
  clearMovie,
  clearSeats,
  clearAllAddOns,
})(GoogleAuth);
