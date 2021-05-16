import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { TICKET_PRICE } from '../../assets/moviesSeed';
import './AddOnsSummary.scss';

const AddOnsSummary = ({ addOns, selectedSeats }) => {
  const seatNumbers = selectedSeats
    .map((seat) => `seat ${seat.seat}/ row ${seat.row}`)
    .join(', ');

  const renderAddOnType = (addOn) => {
    return Object.values(addOns).map(
      ({ id, item, size, price, quantity }) =>
        item === addOn &&
        quantity > 0 && (
          <div className={`AddOnsSummary__item-${addOn}`} key={id}>
            <span>
              {size === 'xl' ? 'Large' : size === 'md' ? 'Medium' : 'Small'}{' '}
            </span>
            <span>x {quantity}</span>
            <span>{`($${(price * quantity).toFixed(2)})`}</span>
          </div>
        )
    );
  };

  const isSelected = (addOn) => {
    return Object.values(addOns).some(
      (item) => item.item === addOn && item.quantity > 0
    );
  };

  const isAddOnsEmpty = () => {
    return (
      _.isEmpty(addOns) ||
      Object.values(addOns).every((item) => item.quantity === 0)
    );
  };

  const calculateTotal = () => {
    const addOnsTotal = Object.values(addOns)
      .map((item) => item.price * item.quantity)
      .reduce((acc, item) => acc + item, 0);
    const ticketsTotal = selectedSeats.length * TICKET_PRICE;
    return addOnsTotal + ticketsTotal;
  };

  return (
    <div className='AddOnsSummary'>
      {!isAddOnsEmpty() ? (
        <>
          <h3>Your AddOns</h3>
          <div className='AddOnsSummary__items'>
            {isSelected('coffee') && (
              <div className='AddOnsSummary__items-item'>
                <h4>Coffee</h4>
                {renderAddOnType('coffee')}
              </div>
            )}

            {isSelected('coke') && (
              <div className='AddOnsSummary__items-item'>
                <h4>Coke</h4>
                {renderAddOnType('coke')}
              </div>
            )}
            {isSelected('popcorn') && (
              <div className='AddOnsSummary__items-item'>
                <h4>Popcorn</h4>
                {renderAddOnType('popcorn')}
              </div>
            )}
          </div>
        </>
      ) : null}

      <h3>Your Tickets</h3>
      <div className='AddOnsSummary__seats'>
        <span>{seatNumbers}</span>
        <span>
          {selectedSeats && selectedSeats.length} tickets x ${TICKET_PRICE}
        </span>
      </div>
      <div className='AddOnsSummary__total'>
        <h3>Total</h3>$ {selectedSeats && calculateTotal()}
      </div>
    </div>
  );
};
const mapStateToProps = ({ addOns, seats }) => ({
  addOns: addOns.addOns,
  selectedSeats: seats.selectedSeats,
});

export default connect(mapStateToProps)(AddOnsSummary);
