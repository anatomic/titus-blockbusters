import React, { Component } from "react";
import c from "classnames";
import PropTypes from "proptypes";

import assign from "crocks/helpers/assign";
import objOf from "crocks/helpers/objOf";
import Board from "./Board";

import Players from "./Players";

const toColourClass = p => objOf(`flash-${p.colour}`, p.oneAway);
const playerClasses = players =>
  players.bimap(toColourClass, toColourClass).merge(assign);

export class GameUI extends Component {
  render() {
    const flashTiles = this.props.game.cata({
      NotStarted: () => ({}),
      Intro: () => ({}),
      Selectable: () => playerClasses(this.props.players),
      Asking: () => ({ "no-flash": true }),
      Answering: () => ({ "no-flash": true }),
      Complete: (tiles, winner) => ({ [`flash-${winner.colour}`]: true })
    });
    const classes = c("game", flashTiles);
    return (
      <div className={classes}>
        <Board game={this.props.game} onTileClick={this.props.onTileClick} />
        <Players
          players={this.props.players}
          onClick={this.props.onPlayerBuzz}
        />
      </div>
    );
  }
}

GameUI.propTypes = {
  game: PropTypes.object,
  players: PropTypes.object,
  onPlayerBuzz: PropTypes.func,
  onTileClick: PropTypes.func
};

export default GameUI;
