import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './AccountDetailsMenu.scss';

const AccountDetails = ({ toggleAccountDetails, history }) => {
  const renderPurchaseHistory = () => {
    history.push('/orders');
    toggleAccountDetails();
  };

  const renderProfile = () => {
    history.push('/profile');
    toggleAccountDetails();
  };

  return (
    <div className='AccountDetails'>
      <div
        onClick={renderPurchaseHistory}
        className='AccountDetails__purchaseHistory'
      >
        <i className='fas fa-money-bill-wave'></i>
        Purchase History
      </div>
      <div onClick={renderProfile} className='AccountDetails__profile'>
        <i className='far fa-user-circle'></i>
        Profile
      </div>
      {/* <div onClick={onSignOut} className='AccountDetails__signOut'>
        <i className='fas fa-sign-out-alt'></i>
        Sign Out
      </div> */}
    </div>
  );
};

export default withRouter(connect(null)(AccountDetails));
