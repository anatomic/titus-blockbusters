import React, { Component } from "react";
import { fromEvent } from "most";
import PropTypes from "proptypes";
import fst from "crocks/Pair/fst";
import snd from "crocks/Pair/snd";

export const Controls = ({
  game,
  onCorrectAnswer,
  onIncorrectAnswer,
  onPlayerBuzz,
  onTileClick,
  players
}) =>
  game.cata({
    NotStarted: () => null,
    Selectable: () => <KeyControls onKeyPress={onTileClick} />,
    Asking: () => (
      <KeyControls
        onKeyPress={key => {
          switch (key) {
            case "arrowleft": {
              return onPlayerBuzz(fst(players));
            }
            case "arrowright": {
              return onPlayerBuzz(snd(players));
            }
          }
        }}
      />
    ),
    Answering: () => (
      <KeyControls
        onKeyPress={key => {
          switch (key) {
            case " ": {
              return onCorrectAnswer();
            }
            case "x": {
              return onIncorrectAnswer();
            }
          }
        }}
      />
    ),
    Complete: () => null
  });

Controls.propTypes = {
  game: PropTypes.object,
  players: PropTypes.object,
  onCorrectAnswer: PropTypes.func,
  onIncorrectAnswer: PropTypes.func,
  onPlayerBuzz: PropTypes.func,
  startGame: PropTypes.func,
  onTileClick: PropTypes.func
};

const keyListener = fromEvent("keyup", window).map(({ key }) =>
  key.toLowerCase()
);

class KeyControls extends Component {
  componentDidMount() {
    this.subscription = keyListener.subscribe({
      next: key => this.props.onKeyPress(key),
      error: () => this.subscription.unsubscribe(),
      complete: () => this.subscription.unsubscribe()
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return null;
  }
}

KeyControls.propTypes = {
  onKeyPress: PropTypes.func
};

export default Controls;
