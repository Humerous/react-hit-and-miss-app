import React from 'react';

import { TextField, Button } from '@material-ui/core';

const Form = ({ block, returnGuessToApp }) => {
  const onSubmit = (e) => {
    e.preventDefault();

    if (!block) {
      const guess = e.target.elements.guess.value;

      e.target.elements.guess.value = ''; // Clear input field after submit

      returnGuessToApp(guess);
    }
  };

  return (
    <form style={{ marginTop: '20px' }} onSubmit={onSubmit}>
      <TextField
        style={{ paddingBottom: '10px' }}
        fullWidth
        type='number'
        name='guess'
        inputProps={{ min: '0', max: '100', step: '1' }}
        label='Make an estimate...'
        required
      />
      <Button
        fullWidth
        variant='contained'
        style={{
          borderRadius: 3,
          backgroundColor: '#00bcd4',
          fontSize: '1em',
        }}
        type='submit'
      >
        Estimate
      </Button>
    </form>
  );
};

export default Form;
