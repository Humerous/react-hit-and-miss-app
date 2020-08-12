import React from 'react';

import './Progress.css';

const Progress = ({ attempt, guessList }) => (
  <div style={{ marginTop: '50px' }} className='progressBar'>
    <h2 style={{ marginBottom: 0 }}>Estimate #{attempt}</h2>
    <ul style={{ marginTop: '10px' }} className='progressBar__history'>
      {guessList}
    </ul>
  </div>
);

export default Progress;
