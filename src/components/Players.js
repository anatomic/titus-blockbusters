import React, { Component } from "react";
import PropTypes from "proptypes";
import c from "classnames";
import fst from "crocks/Pair/fst";
import snd from "crocks/Pair/snd";
import "./Players.css";

import { Player, PlayerPropTypes } from "../data/model/Player";

export class Players extends Component {
  render() {
    const { players, onClick } = this.props;
    return (
      <div className="players">
        <PlayerPanel player={fst(players)} onClick={onClick} />
        <PlayerPanel player={snd(players)} onClick={onClick} />
      </div>
    );
  }
}

Players.propTypes = {
  players: PropTypes.object,
  onClick: PropTypes.func
};

export class PlayerPanel extends Component {
  render() {
    const { player, onClick } = this.props;
    const { name, points, colour } = player;
    const displayPoints = ("000" + points).slice(-3);
    const classes = c({
      player: true,
      [`player-${colour}`]: true,
      "is-active": Player.Answering.is(player)
    });
    return (
      <div className={classes} onClick={() => onClick(player)}>
        <span className="player-name">{name}</span>
        <span className="player-points">{displayPoints}</span>
      </div>
    );
  }
}

PlayerPanel.propTypes = {
  player: PlayerPropTypes,
  onClick: PropTypes.func
};
export default Players;
