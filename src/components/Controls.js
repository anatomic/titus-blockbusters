import React, { Component } from "react";
import { fromEvent } from "most";
import PropTypes from "proptypes";
import fst from "crocks/Pair/fst";
import snd from "crocks/Pair/snd";

import correctAnswer from "../assets/correct-answer.mp3";
import incorrectAnswer from "../assets/wrong-answer.mp3";
import buzzer from "../assets/buzzer.mp3";
import theme from "../assets/theme.mp3";

export const Controls = ({
  game,
  onBlockBusters,
  onCorrectAnswer,
  onIncorrectAnswer,
  onPlayerBuzz,
  onTileClick,
  onOneAway,
  players
}) =>
  game.cata({
    NotStarted: () => null,
    Selectable: () => (
      <KeyControls
        onKeyPress={key => {
          switch (key) {
            case "arrowleft": {
              return onOneAway(fst(players));
            }
            case "arrowright": {
              return onOneAway(snd(players));
            }
            default: {
              return onTileClick(key);
            }
          }
        }}
      />
    ),
    Asking: () => (
      <KeyControls
        onKeyPress={key => {
          switch (key) {
            case "arrowleft": {
              new Audio(buzzer).play();
              return onPlayerBuzz(fst(players));
            }
            case "arrowright": {
              new Audio(buzzer).play();
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
              new Audio(correctAnswer).play();
              return onCorrectAnswer();
            }
            case "x": {
              new Audio(incorrectAnswer).play();
              return onIncorrectAnswer();
            }
            case "enter": {
              new Audio(theme).play();
              return onBlockBusters();
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
  onOneAway: PropTypes.func,
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
