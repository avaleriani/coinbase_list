import React from 'react';
import SpinnerImg from '../../assets/images/coins.gif';
import './spinner.scss';

const Spinner = () => {
  return (
    <div className="spinner">
      <img alt="spinner" src={ SpinnerImg }/>
    </div>
  );
};

export default Spinner;
