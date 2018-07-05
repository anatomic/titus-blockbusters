import React, { Component } from "react";
import PropTypes from "proptypes";
import { connect } from "react-redux";
import identity from "crocks/combinators/identity";
import "./App.css";
import { PlayerPropTypes } from "./data/model/Player";

import Board from "./components/Board";
import Controls from "./components/Controls";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Titus Blockbusters</h1>
        </header>
        <Board
          game={this.props.game}
          player1={this.props.player1}
          player2={this.props.player2}
          onTileClick={this.props.onTileClick}
        />
        <Controls
          game={this.props.game}
          onCorrectAnswer={this.props.onCorrectAnswer}
          player1={this.props.player1}
          player2={this.props.player2}
          startGame={this.props.startGame}
          onTileClick={this.props.onTileClick}
        />
      </div>
    );
  }
}

App.propTypes = {
  game: PropTypes.object,
  player1: PlayerPropTypes,
  player2: PlayerPropTypes,
  onCorrectAnswer: PropTypes.func,
  startGame: PropTypes.func,
  onTileClick: PropTypes.func
};

const mapStateToProps = identity;
const mapDispatchToProps = dispatch => ({
  onTileClick: char => dispatch({ type: "SELECT_TILE", payload: char }),
  startGame: () => dispatch({ type: "START" }),
  onCorrectAnswer: team => dispatch({ type: "CORRECT_ANSWER", payload: team })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
