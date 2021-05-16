import React from 'react';
import Row from './Row/Row';
import './SeatSelector.scss';

const SeatSelector = () => {
  return (
    <div className='SeatSelector'>
      <div className='SeatSelector__screen'></div>
      <div className='SeatSelector__seatingPlan'>
        <Row rowNumber={1} />
        <Row rowNumber={2} />
        <Row rowNumber={3} />
        <Row rowNumber={4} />
        <Row rowNumber={5} />
        <Row rowNumber={6} />
        <Row rowNumber={7} />
        <div className='SeatSelector__seatingPlan--space'></div>
        <Row rowNumber={8} />
        <Row rowNumber={9} />
        <Row rowNumber={10} />
        <Row rowNumber={11} />
        <Row rowNumber={12} />
        <Row rowNumber={13} />
      </div>
    </div>
  );
};

export default SeatSelector;
