import React, { Component } from "react";
import PropTypes from "proptypes";
import "./Board.css";

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
    return (
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
        <div className="tiles">
          {this.props.game.cata({
            NotStarted: () => null,
            Intro: () => null,
            Selectable: this.renderTiles,
            Asking: this.renderTiles,
            Answering: this.renderTiles,
            Complete: this.renderTiles
          })}
        </div>
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
    const style = {
      top: row * 125 + extra,
      left: column * 108,
      position: "absolute"
    };
    return (
      <div style={style} onClick={this.handleClick}>
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
          Won: colour => <div className={`tile tile--${colour}`} />
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
