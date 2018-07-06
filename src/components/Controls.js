import React, { Component } from "react";
import { fromEvent } from "most";
import fst from "crocks/Pair/fst";
import snd from "crocks/Pair/snd";
import PropTypes from "proptypes";
import "./Controls.css";

export const Controls = ({
  game,
  onCorrectAnswer,
  onIncorrectAnswer,
  onTileClick,
  players
}) => (
  <div className="controls">
    {game.cata({
      NotStarted: () => null,
      Selectable: () => <KeyControls onKeyPress={onTileClick} />,
      Asking: () => null,
      Answering: () => (
        <div>
          <button className="c-btn" onClick={onCorrectAnswer}>
            Correct
          </button>
          <button className="c-btn" onClick={onIncorrectAnswer}>
            Incorrect
          </button>
          <KeyControls
            onKeyPress={key => {
              switch (key) {
                case "1":
                case "b": {
                  onCorrectAnswer(fst(players));
                  break;
                }
                case "2":
                case "w": {
                  onCorrectAnswer(snd(players));
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
  players: PropTypes.object,
  onCorrectAnswer: PropTypes.func,
  onIncorrectAnswer: PropTypes.func,
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
