import React from 'react';
import { connect } from 'react-redux';

import { selectSeat, deselectSeat } from '../../../store/actions/seats';
import { occupiedSeats } from '../../../assets/moviesSeed';
import './Seat.scss';

const Seat = ({
  seatNumber,
  rowNumber,
  selectSeat,
  deselectSeat,
  selectedSeats,
}) => {
  const onClickSeat = { seat: seatNumber, row: rowNumber };

  //check if the seat was already booked before
  const bookedSeats = occupiedSeats[rowNumber].some(
    (seat) => seat === seatNumber
  );

  const renderSeat = () => {
    return (
      //renders styles for taken seats(booked) and selected seats
      <div
        className={`Seat ${bookedSeats && 'booked'} ${
          selectedSeats &&
          selectedSeats.some(
            (savedSeat) =>
              savedSeat.seat === onClickSeat.seat &&
              savedSeat.row === onClickSeat.row
          )
            ? 'selected'
            : ''
        }`}
        onClick={renderClick}
      >
        {seatNumber}
      </div>
    );
  };
  const renderClick = () => {
    //compare clicked time-block with what is in Redux
    if (
      selectedSeats &&
      selectedSeats.some(
        (savedSeat) =>
          savedSeat.seat === onClickSeat.seat &&
          savedSeat.row === onClickSeat.row
      )
    ) {
      deselectSeat(onClickSeat);
      return;
    }

    selectSeat(onClickSeat);
  };
  return renderSeat();
};

const mapStateToProps = ({ seats }) => ({
  selectedSeats: seats.selectedSeats,
});

export default connect(mapStateToProps, { selectSeat, deselectSeat })(Seat);
