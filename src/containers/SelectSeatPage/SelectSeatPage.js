import React from 'react';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import SeatSelector from '../../components/SeatSelector/SeatSelector';
import './SelectSeatPage.scss';

const SelectSeatPage = () => {
  return (
    <div className='SelectSeatPage'>
      <SeatSelector />
      <OrderSummary />
    </div>
  );
};

export default SelectSeatPage;
