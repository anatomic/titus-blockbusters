import React, { Component } from "react";
import PropTypes from "proptypes";
import c from "classnames";
import "./Board.css";

import { Game } from "../data/model/Game";

class Board extends Component {
  renderTiles = tiles => {
    return tiles.map((t, idx) => (
      <BoardTile
        key={`tile-${idx}`}
        tile={t}
        idx={idx}
        onClick={this.props.onTileClick}
      />
    ));
  };

  render() {
    const classes = c({
      [`flash-${this.props.player1.colour}`]: this.props.player1.oneAway,
      [`flash-${this.props.player2.colour}`]: this.props.player2.oneAway,
      "no-flash":
        Game.Active.is(this.props.game) || Game.Complete.is(this.props.game),
      game: true
    });
    const tiles = this.props.game.cata({
      NotStarted: this.renderTiles,
      Selectable: this.renderTiles,
      Active: this.renderTiles,
      Complete: () => <div>Complete</div>
    });
    return (
      <div className={classes}>
        <div className="board">
          <div className="tile-column tile-column--left">
            <div className="tile tile--blue" />
            <div className="tile tile--blue" />
            <div className="tile tile--blue" />
            <div className="tile tile--blue" />
            <div className="tile tile--blue" />
            <div className="tile tile--blue" />
          </div>
          <div className="tile-row tile-row--top">
            <div className="tile tile--white" />
            <div className="tile tile--white" />
            <div className="tile tile--white" />
            <div className="tile tile--white" />
            <div className="tile tile--white" />
          </div>
          <div className="tiles">{tiles}</div>
          <div className="tile-row tile-row--bottom">
            <div className="tile tile--white" />
            <div className="tile tile--white" />
            <div className="tile tile--white" />
            <div className="tile tile--white" />
            <div className="tile tile--white" />
          </div>
          <div className="tile-column tile-column--right">
            <div className="tile tile--blue" />
            <div className="tile tile--blue" />
            <div className="tile tile--blue" />
            <div className="tile tile--blue" />
            <div className="tile tile--blue" />
            <div className="tile tile--blue" />
          </div>
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  game: PropTypes.object,
  onTileClick: PropTypes.func
};

class BoardTile extends Component {
  handleClick = () => this.props.onClick(this.props.tile.char);

  render() {
    const { tile, idx } = this.props;
    const row = Math.floor(idx / 5);
    const column = idx % 5;
    const extra = column === 1 || column === 3 ? 62.5 : 0;
    return (
      <div
        style={{
          top: row * 125 + extra,
          left: column * 108,
          position: "absolute"
        }}
        onClick={this.handleClick}
      >
        {tile.cata({
          Available: char => (
            <div className="tile">
              <span className="tile-char">{char}</span>
            </div>
          ),
          Selected: char => (
            <div className="tile is-selected">
              <span className="tile-char">{char}</span>
            </div>
          ),
          Won: colour => <div className={`tile is-won tile--${colour}`} />
        })}
      </div>
    );
  }
}

BoardTile.propTypes = {
  onClick: PropTypes.func,
  tile: PropTypes.object,
  idx: PropTypes.number
};

export default Board;
