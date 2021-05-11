import React from 'react';
import { connect } from 'react-redux';
import {
  selectMovieTime,
  deselectMovieTime,
} from '../../../../store/actions/movies';
import { showTimeBlocks } from '../../../../assets/moviesSeed';
import './TimeBlock.scss';

const TimeBlock = ({
  selectMovieTime,
  deselectMovieTime,
  day,
  block,
  taken,
  selectedMovieTime,
}) => {
  //id created based on selected day and time block
  const selectedBlock = `${day}: ${showTimeBlocks[block]}`;

  const renderClick = () => {
    //compare clicked time-block with what is in Redux
    if (selectedMovieTime === selectedBlock) {
      deselectMovieTime();
      return;
    }

    selectMovieTime(selectedBlock);
  };

  return (
    <div
      className={`TimeBlock ${taken === 'taken' ? 'taken' : 'notTaken'} ${
        selectedMovieTime === selectedBlock ? 'selected' : ''
      }`}
      onClick={renderClick}
    >
      {selectedMovieTime === selectedBlock && taken === 'taken' ? (
        <>
          <i className='fas fa-check'></i>
          {selectedBlock}
        </>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ movies }) => ({
  selectedMovieTime: movies.selectedMovieTime,
});

export default connect(mapStateToProps, { selectMovieTime, deselectMovieTime })(
  TimeBlock
);
