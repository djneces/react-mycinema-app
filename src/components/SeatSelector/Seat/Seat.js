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
  selectedSeat,
}) => {
  const onClickSeat = { seat: seatNumber, row: rowNumber };

  //check if the seat was already booked before
  const bookedSeats = occupiedSeats[rowNumber].some(
    (seat) => seat === seatNumber
  );

  const renderSeat = () => {
    return (
      <div
        className={`Seat ${bookedSeats && 'booked'} ${
          selectedSeat &&
          selectedSeat.seat === onClickSeat.seat &&
          selectedSeat.row === onClickSeat.row
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
      selectedSeat &&
      selectedSeat.seat === onClickSeat.seat &&
      selectedSeat.row === onClickSeat.row
    ) {
      deselectSeat();
      return;
    }

    selectSeat(onClickSeat);
  };
  return renderSeat();
};

const mapStateToProps = ({ seats }) => ({
  selectedSeat: seats.selectedSeat,
});

export default connect(mapStateToProps, { selectSeat, deselectSeat })(Seat);
