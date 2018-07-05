import React, { Component } from "react";
import { fromEvent } from "most";
import PropTypes from "proptypes";

import { PlayerPropTypes } from "../data/model/Player";

export const Controls = ({
  game,
  onCorrectAnswer,
  onTileClick,
  player1,
  player2,
  startGame
}) => (
  <div className="controls">
    {game.cata({
      NotStarted: () => <button onClick={startGame}>Start Game</button>,
      Selectable: () => (
        <div>
          Select a tile
          <KeyControls onTileClick={onTileClick} />
        </div>
      ),
      Active: () => (
        <div>
          <button onClick={() => onCorrectAnswer(player1)}>
            {player1.name}
          </button>
          <button onClick={() => onCorrectAnswer(player2)}>
            {player2.name}
          </button>
        </div>
      ),
      Complete: () => null
    })}
  </div>
);

Controls.propTypes = {
  game: PropTypes.object,
  player1: PlayerPropTypes,
  player2: PlayerPropTypes,
  onCorrectAnswer: PropTypes.func,
  startGame: PropTypes.func,
  onTileClick: PropTypes.func
};

const keyListener = fromEvent("keyup", window).map(({ key }) =>
  key.toLowerCase()
);

class KeyControls extends Component {
  componentDidMount() {
    this.subscription = keyListener.subscribe({
      next: this.props.onTileClick,
      error: () => this.subscription.unsubscribe(),
      complete: () => this.subscription.unsubscribe()
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return <React.Fragment />;
  }
}

KeyControls.propTypes = {
  onTileClick: PropTypes.func
};

export default Controls;
