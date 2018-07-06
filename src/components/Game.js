import React, { Component } from "react";
import c from "classnames";
import PropTypes from "proptypes";
import assign from "crocks/helpers/assign";
import objOf from "crocks/helpers/objOf";
import Board from "./Board";
import Controls from "./Controls";

import Players from "./Players";
import { Game } from "../data/model/Game";

const toColourClass = p => objOf(`flash-${p.colour}`, p.oneAway);
const playerClasses = players =>
  players.bimap(toColourClass, toColourClass).merge(assign);

export class GameUI extends Component {
  render() {
    const classes = c(
      {
        "no-flash":
          Game.Answering.is(this.props.game) || Game.Asking.is(this.props.game),
        game: true
      },
      playerClasses(this.props.players)
    );
    return (
      <div className={classes}>
        <Board game={this.props.game} onTileClick={this.props.onTileClick} />
        <Players
          players={this.props.players}
          onClick={this.props.onPlayerBuzz}
        />
        <Controls
          onTileClick={this.props.onTileClick}
          onCorrectAnswer={this.props.onCorrectAnswer}
          onIncorrectAnswer={this.props.onIncorrectAnswer}
          onPlayerBuzz={this.props.onPlayerBuzz}
          game={this.props.game}
          players={this.props.players}
        />
      </div>
    );
  }
}

GameUI.propTypes = {
  game: PropTypes.object,
  players: PropTypes.object,
  onCorrectAnswer: PropTypes.func,
  onIncorrectAnswer: PropTypes.func,
  onPlayerBuzz: PropTypes.func,
  onTileClick: PropTypes.func
};

export default GameUI;
