import React, { Component } from 'react';
import {
  authInit,
  googleSignIn,
  googleSignOut,
  onAuthChange,
} from '../../store/actions/auth';
import { connect } from 'react-redux';
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

  onSignInClick = () => {
    this.props.googleSignIn(this.googleAuth);
  };

  onSignOutClick = () => {
    this.props.googleSignOut(this.googleAuth);
  };

  renderAuthButton() {
    const { isAuthenticated, username } = this.props;
    if (isAuthenticated === null) {
      return null;
    } else if (isAuthenticated) {
      return (
        <div className='GoogleAuth__userProfile'>
          <span>Hello, </span>
          <span>{username}</span>
          <i className='far fa-user'></i>
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

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  username: auth.currentUser?.username,
});

export default connect(mapStateToProps, {
  authInit,
  googleSignIn,
  googleSignOut,
  onAuthChange,
})(GoogleAuth);
