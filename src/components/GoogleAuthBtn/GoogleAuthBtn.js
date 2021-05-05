import React, { Component } from 'react';
// import { auth } from '../../googleAuthUtil';
import {
  authInit,
  googleSignIn,
  googleSignOut,
  onAuthChange,
} from '../../store/actions/auth';
import { connect } from 'react-redux';

class GoogleAuth extends Component {
  state = { isSignedIn: null };

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
    const { isAuthenticated } = this.props;
    if (isAuthenticated === null) {
      return null;
    } else if (isAuthenticated) {
      return <button onClick={this.onSignOutClick}>Sign Out</button>;
    } else {
      return <button onClick={this.onSignInClick}>Sign In with Google</button>;
    }
  }

  render() {
    return <div className='GoogleAuth'>{this.renderAuthButton()}</div>;
    // return <div className='GoogleAuth'></div>;
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  authInit,
  googleSignIn,
  googleSignOut,
  onAuthChange,
})(GoogleAuth);
