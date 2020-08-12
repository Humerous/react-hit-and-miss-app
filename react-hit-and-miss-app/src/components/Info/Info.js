import React from 'react';
import { Button, DialogTitle, Dialog, DialogContent } from '@material-ui/core';

class Info extends React.Component {
  state = { open: false };

  handleToggle = () => this.setState({ open: !this.state.open });

  render() {
    const { open } = this.state;

    return (
      <React.Fragment>
        <Dialog open={open} onClose={this.handleToggle}>
          <DialogTitle>Rules of the Game</DialogTitle>
          <DialogContent>
            This is a Prediction Estimation Game with the following rules:
            <ol>
              <li>
                You can have unlimited goes, so make evry chance count because
                you are against yourself.
              </li>
              <li> You have to guess a random number between 1 to 100 </li>
              <li>
                The game will access how close you are to your predetermined
                number and judged on how close or far your guess is with a
                tempreture gauge reading on the form of the following keywords{' '}
                <br />
                IE: ("cold", "warm", "hot", "extremely hot").
              </li>
              <li>
                The goal of the game is to predict the correct number is as few
                chance as possible
              </li>
            </ol>
            Hope you enjoy!
          </DialogContent>
          <Button onClick={this.handleToggle}>CLOSE</Button>
        </Dialog>
        <Button
          fullWidth
          variant='contained'
          style={{
            borderRadius: 3,
            backgroundColor: '#f7b733',
            fontSize: '18px',
          }}
          onClick={this.handleToggle}
        >
          Rules to Play
        </Button>
      </React.Fragment>
    );
  }
}

export default Info;
