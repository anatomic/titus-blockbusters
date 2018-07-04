import React, { Component } from "react";
import PropTypes from "proptypes";
import { connect } from "react-redux";
import c from "classnames";
import identity from "crocks/combinators/identity";
import isDefined from "crocks/predicates/isDefined";
import "./App.css";
import { Game } from "./data/model/Game";

class App extends Component {
  render() {
    const classes = c({
      [`flash-${this.props.player1.colour}`]: this.props.player1.oneAway,
      [`flash-${this.props.player2.colour}`]: this.props.player2.oneAway,
      "no-flash": Game.Active.is(this.props.game) || Game.Complete.is(this.props.game),
      game: true
    });

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Titus Blockbusters</h1>
        </header>
        <div className={classes}>
          {this.props.game.cata({
            NotStarted: tiles => <Board tiles={tiles} />,
            Selectable: tiles => (
              <Board tiles={tiles} onTileClick={this.props.onTileClick} />
            ),
            Active: tiles => <Board tiles={tiles} />,
            Complete: () => <div>Complete</div>
          })}
        </div>
        <div>
          <button onClick={this.props.startGame}>Start Game</button>
          <button
            onClick={() => this.props.onCorrectAnswer(this.props.player1)}
          >
            {this.props.player1.name}
          </button>
          <button
            onClick={() => this.props.onCorrectAnswer(this.props.player2)}
          >
            {this.props.player2.name}
          </button>
        </div>
      </div>
    );
  }
}

const Player = PropTypes.shape({
  name: PropTypes.string,
  colour: PropTypes.string
});

App.propTypes = {
  game: PropTypes.object,
  player1: Player,
  player2: Player,
  onCorrectAnswer: PropTypes.func,
  startGame: PropTypes.func,
  onTileClick: PropTypes.func
};

class Board extends Component {
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
          {this.props.tiles.map((t, idx) => (
            <BoardTile
              key={`tile-${idx}`}
              tile={t}
              idx={idx}
              onClick={this.props.onTileClick}
            />
          ))}
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
  tiles: PropTypes.array,
  onTileClick: PropTypes.func
};

class BoardTile extends Component {
  handleClick = () =>
    isDefined(this.props.onClick) ? this.props.onClick(this.props.tile) : null;

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

const mapStateToProps = identity;
const mapDispatchToProps = dispatch => ({
  onTileClick: char => dispatch({ type: "SELECT_TILE", payload: char }),
  startGame: () => dispatch({ type: "START" }),
  onCorrectAnswer: team => dispatch({ type: "CORRECT_ANSWER", payload: team })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
