import React, { Component } from "react";
import { fromEvent } from "most";
import PropTypes from "proptypes";
import "./Controls.css";

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
      NotStarted: () => (
        <button onClick={startGame} className="c-start-btn c-btn">
          Start Game
        </button>
      ),
      Selectable: () => (
        <div>
          Select a tile
          <KeyControls onKeyPress={onTileClick} />
        </div>
      ),
      Active: () => (
        <div>
          <button className="c-btn" onClick={() => onCorrectAnswer(player1)}>
            {player1.name}
          </button>
          <button className="c-btn" onClick={() => onCorrectAnswer(player2)}>
            {player2.name}
          </button>
          <KeyControls
            onKeyPress={key => {
              switch (key) {
                case "1":
                case "b": {
                  onCorrectAnswer(player1);
                  break;
                }
                case "2":
                case "w": {
                  onCorrectAnswer(player2);
                  break;
                }
              }
            }}
          />
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
      next: this.props.onKeyPress,
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
  onKeyPress: PropTypes.func
};

export default Controls;
