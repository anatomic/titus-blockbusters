import React, { Component } from "react";
import PropTypes from "proptypes";
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

const PlayerPanel = ({ player, onClick }) => (
  <div
    className={`player player-${player.colour} ${
      Player.Answering.is(player) ? "is-active" : ""
    }`}
    key={`player-${player.name}`}
    onClick={() => onClick(player)}
  >
    {player.name}
  </div>
);

PlayerPanel.propTypes = {
  player: PlayerPropTypes,
  onClick: PropTypes.func
};
export default Players;
